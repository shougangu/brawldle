import express from "express";
import cors from "cors";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const app = express();
const pgp = pgPromise();
dotenv.config();
app.use(cors());
app.use(express.json());
const port = 3000;
const dayNumb = () => Math.floor(new Date() / 8.64e7) - 19703;
const production = false;
const guesstostring = {
    1: "guess1",
    2: "guess2",
    3: "guess3",
    4: "guess4",
    5: "guess5",
    6: "guess6",
    7: "guess7",
    8: "queries",
};
const stringtoguess = {
    guess1: 1,
    guess2: 2,
    guess3: 3,
    guess4: 4,
    guess5: 5,
    guess6: 6,
    guess7: 7,
    queries: 8,
};
const insertQuery =
    'INSERT INTO guesses ("dayNumb", guess1, guess2, guess3, guess4, guess5, guess6, guess7) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

/* Server Database -------------------------------------------------*/
// const Host = process.env.PG_HOST;
// const Database = process.env.PG_DATABASE;
// const UserName = process.env.PG_USER;
// const Password = process.env.PG_PASSWORD;
// const DBPort = process.env.PG_PORT;
// const connectionString = `postgres://${UserName}:${Password}@${Host}:${DBPort}/${Database}`;
const connectionString = production
    ? process.env.PG_URL
    : "postgres://postgres@localhost:5432/postgres";
const db = pgp(connectionString);
//const users = [];
const testConnection = () => {
    db.connect()
        .then((obj) => {
            console.log("Connected to the database");
            obj.done(); // success, release the connection
        })
        .catch((error) => {
            console.log("ERROR:", error.message || error);
        });
};

/* Routing ------------------------------------------------------*/

app.get("/", (req, res) => {
    res.status(500).send("Express server is running!");
});

/* Authenticating a refresh token + userinformation ------------------------------*/
function authenticateToken(req, res, next) {
    // this is a middleware function that processes the request before the route handler, specifically
    // the function checks if the req token is valid. If it is, the function calls next() after
    // modifying the req object to include the user osjbect
    const authHeader = req.headers["authorization"]; // BEARER TOKEN
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        console.log("authenticateToken() No token");
        return res.status(401).json({ error: "authenticateToken(), No token" });
    }

    // the user argument is the decoded payload of the JWT, which includes the claims that
    // were encoded into the token when it was created, namely {"name": }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("authenticateToken() Invalid token", err.message);
            return res
                .status(403)
                .json({ error: "authenticateToken(), Invalid token" });
        } else {
            req.user = user;
            console.log("function autenticateToken next: ", req.user);
            next();
        }
    });
}
app.get("/userinformation", authenticateToken, async (req, res) => {
    // req must include the accesToken
    const user = await db.oneOrNone("SELECT * FROM users WHERE name = $1", [
        req.user.name,
    ]);
    console.log("User information sending back", user);
    if (user == null) {
        return res.status(400).json({ error: "User not found" });
    }

    res.json(user);
});

/* Adding guesses -------------------------------------------------*/
// creates a row for the current day
const createDayNumb = async () => {
    try {
        console.log("In createDayNumb()");
        // result is a bool, checks if the current dayNumb is stored in the database
        const result = await db.one(
            'SELECT EXISTS(SELECT 1 FROM guesses WHERE "dayNumb" = $1) AS exists',
            [dayNumb()]
        );
        const exists = result.exists;

        if (!exists) {
            await db.none(insertQuery, [dayNumb(), 0, 0, 0, 0, 0, 0, 0]);
        }
    } catch (error) {
        console.log("ERROR:", error);
    }
};

//We can call the fetch method from the frontend pages (html, js) to process the data on the server side (such as through the json file)
app.put("/guesscount", async (req, res) => {
    const index = parseInt(req.body.guesses); // Extract index from request body
    if (index === undefined || index < 1 || index >= 9) {
        return res.status(400).json({ error: "Invalid index" });
    }

    await incrementGuess(index);
    var s = await getGuesses();
    console.log("This is what is sent to the frontend", s);
    res.json({ today: s });
});

//calls upon database to increment the number of guesses by 1
const incrementGuess = async (guesses) => {
    let str = guesstostring[guesses];
    console.log("In incrementGuess()", guesses, str, dayNumb());
    await createDayNumb();
    // await createDayNumb();
    // await createDayNumb(dayNumb + 1, insertQuery);

    try {
        await db.none(
            `UPDATE guesses SET ${str} = ${str} + 1 WHERE "dayNumb" = $1`,
            [dayNumb()]
        );
        console.log("Incremnted Successfully");
    } catch (error) {
        console.log("ERROR", error);
    }
};

// calls upon database to retrieve a specific row
const getGuesses = async () => {
    // there is an issue here with .one
    try {
        console.log("In getGuesses()");
        const data = await db.any(
            'SELECT * FROM guesses WHERE "dayNumb" = $1',
            [dayNumb()]
        );
        return data;
    } catch (error) {
        console.error("ERROR:", error);
        throw error;
    }
};

/* Gamedata db  -------------------------------------------------*/
// req must include Authorization: Bearer token, JSON({daily, normal, hard})
// req -> DB(user_id, daily, normal, hard), JSON response
app.post("/insertGameData", authenticateToken, async (req, res) => {
    console.log("in /insertGameData");
    const { daily, normal, hard } = req.body;
    const user = await db.oneOrNone("SELECT * FROM users WHERE name = $1", [
        req.user.name,
    ]);
    const user_id = user.id;
    try {
        await db.none(
            "UPDATE game_data SET daily = $2, normal = $3, hard = $4 WHERE user_id = $1",
            [user_id, daily, normal, hard]
        );
        console.log("insertGameData: Game data inserted");
        res.json({ message: "Game data inserted" });
    } catch (error) {
        console.error("Error in /insertGameData route:", error, user_id);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/getGameData", authenticateToken, async (req, res) => {
    console.log("in /getGameData");
    const user = await db.oneOrNone("SELECT * FROM users WHERE name = $1", [
        req.user.name,
    ]);
    const user_id = user.id;
    try {
        const data = await db.one(
            "SELECT * FROM game_data WHERE user_id = $1",
            [user_id]
        );
        console.log("getGameData: Retrieved Game data", data);
        res.json(data);
    } catch (error) {
        console.error("Error in /getGameData route:", error, user_id);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(port);
