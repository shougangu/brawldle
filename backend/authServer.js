/**
 * Server on port 4000 for the purposes of registering and logging in users.
 * Loggin, logoff, refresh tokens
 * Everything Authentication related
 *
 */

import express from "express";
import cors from "cors";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const app = express();
const pgp = pgPromise();
dotenv.config();
app.use(cors());
app.use(express.json());
const port = 4000;
const dayNumb = () => Math.floor(new Date() / 8.64e7) - 19703;
const production = false;
/* Server Database -------------------------------------------------*/
// const Host = process.env.PG_HOST;
// const Database = process.env.PG_DATABASE;
// const UserName = process.env.PG_USER;
// const Password = process.env.PG_PASSWORD;
// const DBPort = process.env.PG_PORT;
//const connectionString = `postgres://${UserName}:${Password}@${Host}:${DBPort}/${Database}`;
const connectionString = production
    ? process.env.PG_URL
    : "postgres://postgres@localhost:5432/postgres";
const db = pgp(connectionString);

/* Routing ------------------------------------------------------*/
app.get("/", (req, res) => {
    res.status(500).send("Express server is running!");
});


app.post("/token", async (req, res) => {
    // create a new accessToken based on an existing refresh token
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        console.log("/token: No refreshtoken in req");
        return res
            .status(401)
            .json({ error: "/token: No refreshtoken in req" });
    }

    const existingToken = await db.oneOrNone(
        "SELECT * FROM refresh_tokens WHERE token = $1",
        [refreshToken]
    );
    if (!existingToken) {
        console.log("/token: refreshtoken not present in db");
        return res
            .status(403)
            .json({ error: "/token: refreshtoken not present in db" });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
            if (err) {
                console.log("/token: invalid refreshtoken", err.message);
                return res
                    .status(403)
                    .json({ error: "/token: invalid refreshtoken" });
            }

            const username = await db.oneOrNone(
                "SELECT name FROM users WHERE id = $1",
                [existingToken.user_id]
            );

            if (!username) {
                console.log("/token: user not found");
                return res
                    .status(404)
                    .json({ error: "/token: user not found" });
            }

            const accessToken = generateAccessToken({ name: username.name });
            console.log(
                "/token new accessToken for",
                username.name,
                accessToken
            );
            res.json({ accessToken: accessToken });
        }
    );
});


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    });
}
app.post("/users/register", async (req, res) => {
    console.log("in /users/register authServer.js")
    try {
        // registration validation
        let { name, email, password, password2 } = req.body;

        if (!name || !email || !password || !password2) {
            console.log("/users/register: Please enter all fields");
            return res.status(400).json({ error: "Please enter all fields" });
        }
        if (password.length < 6) {
            console.log("/users/register: PW must be at least 6 characters long");
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters long" });
        }
        if (password !== password2) {
            console.log("/users/register: Password must match");
            return res.status(400).json({ error: "Password must match" });
        }

        const existingUser = await db.oneOrNone(
            "SELECT * FROM users WHERE name = $1",
            [req.body.name]
        );
        const existingEmail = await db.oneOrNone(
            "SELECT * FROM users WHERE email = $1",
            [req.body.email]
        );
        if (existingUser) {
            console.log("/users/register: User already exists");
            return res.status(400).json({ error: "User already exists" });
        }
        if (existingEmail) {
            console.log("/users/register: Email already exists");
            return res.status(400).json({ error: "Email already exists" });
        }

        // generate a random salt and add it to the password to create hashedpw

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = {
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        };
        await db.none(
            "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
            [user.name, user.email, user.password]
        );
        const user_id = await db.one("SELECT id FROM users WHERE name = $1", [
            user.name,
        ]);
        await db.none("INSERT INTO game_data(user_id) VALUES($1)", [
            user_id.id,
        ]);
        console.log(
            "/users/register: User registered",
            user.name,
            user.email,
            user.password
        );
        res.json({ message: "User registered" });
    } catch (error) {
        console.error("Error in /users route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/users/login", async (req, res) => {
    // req should be in the form of {name: _ , password: _}
    // used by the login function in backend api
    // if the user is found, then the existingUser object is in the form of
    // {id, name, email, password}
    console.log("in users/login authServer.js")

    const user = await db.oneOrNone("SELECT * FROM users WHERE name = $1", [
        req.body.name,
    ]);
    if (user == null) {
        console.log("in users/login error : User not found")
        return res.status(400).json({ error: "User not found" });
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // succesfully logged in
            const username = req.body.name;

            // we generate a refresh acesstoken bounded with the username
            const accessToken = generateAccessToken({ name: username });

            // and also a refresh token is created
            // and stored in the refreshTokens DB
            const refreshToken = jwt.sign(
                { name: username },
                process.env.REFRESH_TOKEN_SECRET
            );

            let existingToken = await db.oneOrNone(
                "SELECT * FROM refresh_tokens WHERE token = $1",
                [refreshToken]
            );
            //refreshTokens.push(refreshToken);
            if (!existingToken) {
                await db.none(
                    "INSERT INTO refresh_tokens(token,user_id) VALUES($1,$2)",
                    [refreshToken, user.id]
                );
            }
            console.log(
                "/users/login: Insert a new refreshtoken",
                refreshToken
            );
            // the necessary login details are sent back to the client
            res.json({
                username: username,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        } else {
            console.log("in users/login error : wrong pw")
            res.status(400).json({ error: "Incorrect password" });
        }
    } catch (error) {
        res.status(500).json({ error: "/users/login Internal server error" });
    }
});
app.delete("/logout", async (req, res) => {
    // remove the refresh token from db
    const authHeader = req.headers["authorization"]; // BEARER TOKEN
    const token = authHeader && authHeader.split(" ")[1];
    await db.none("DELETE FROM refresh_tokens WHERE token = $1", [token]);
    console.log("/logout delete", token);
    res.sendStatus(204);
});
app.listen(port);
