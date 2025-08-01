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
const production = true;
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


app.get("/", (req, res) => {
    res.status(500).send("Express server is running!");
});

/* Authenticating a refresh token + userinformation ------------------------------*/
function authenticateToken(req, res, next) {
    // this is a middleware function that processes the request before the route handler, specifically
    // the function checks if the req token is valid. If it is, the function calls next() after
    // modifying the req object to include the user osjbect
    console.log("in authenticateToken() middleware server.js")
    const authHeader = req.headers["authorization"]; // BEARER TOKEN
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        console.log("in authenticateToken(): no token");
        return res.status(401).json({ error: "in authenticateToken(): no token" });
    }

    // the user argument is the decoded payload of the JWT, which includes the claims that
    // were encoded into the token when it was created, namely the {"name": }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log("in authenticateToken(): Invalid token", err.message);
            return res
                .status(403)
                .json({ error: "authenticateToken(): Invalid token" });
        } else {
            req.user = user;
            console.log("in autenticateToken(): Authenticated User: ", req.user);
            next();
        }
    });
}

// ********** guesses db *********************//

//We can call the fetch method from the frontend pages (html, js) to process the data on the server side (such as through the json file)
app.put("/guesscount", async (req, res) => {
    console.log("In /guesscount server.js")
    const index = parseInt(req.body.guesses); // Extract index from request body
    if (index === undefined || index < 1 || index >= 9) {
        console.log("In /guesscount : Undefined Guess Number")
        return res.status(400).json({ error: "Invalid index" });
    }

    await incrementGuess(index);
    var s = await getGuesses();
    console.log("In /guesscount : Returning", s);
    res.json({ today: s });
});

app.get("/userinformation", authenticateToken, async (req, res) => {
    // req must include the accessToken
    console.log("in /userinformation server.js")
    const user = await db.oneOrNone("SELECT * FROM users WHERE name = $1", [
        req.user.name,
    ]);
    if (user == null) {
        console.log("in /userinformation Error : user not found")
        return res.status(400).json({ error: "User not found" });
    }
    console.log("in /userinformation, sending user information", user);
    res.json(user);
});


// creates a row for the current day
const createDayNumb = async () => {
    try {
        console.log("In createDayNumb() server.js");
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

//calls upon database to increment the number of guesses by 1
const incrementGuess = async (guesses) => {
    let str = guesstostring[guesses];
    console.log("In incrementGuess() server.js : ", guesses, str, dayNumb());
    await createDayNumb();
    try {
        await db.none(
            `UPDATE guesses SET ${str} = ${str} + 1 WHERE "dayNumb" = $1`,
            [dayNumb()]
        );
        console.log("In incrementGuess() : Sucessfully increased", str);
    } catch (error) {
        console.log("In incrementGuess() Error : ", error);
    }
};

// calls upon database to retrieve a specific row
const getGuesses = async () => {
    // there is an issue here with .one
    console.log("In getGuesses() server.js");
    try {
        const data = await db.any(
            'SELECT * FROM guesses WHERE "dayNumb" = $1',
            [dayNumb()]
        );
        console.log("In getGuesses(), returning ", data)
        return data;
    } catch (error) {
        console.error("in getGuesses() Error : ", error);
        throw error;
    }
};



/* Gamedata db  -------------------------------------------------*/
// req must include Authorization: Bearer token, JSON({daily, normal, hard})
// req -> DB_users (to get user_id of Bearer Token), -> DB_game_data -> JSON update 
app.post("/insertGameData", authenticateToken, async (req, res) => {
    console.log("in /insertGameData server.js");
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
        console.log("in /insertGameData: Game data inserted");
        res.json({ message: "Game data inserted" });
    } catch (error) {
        console.error("in /insertGameData Error:", error, daily, normal, hard);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/getGameData", authenticateToken, async (req, res) => {
    console.log("in /getGameData server.js");
    const user = await db.oneOrNone("SELECT * FROM users WHERE name = $1", [
        req.user.name,
    ]);
    const user_id = user.id;
    try {
        const data = await db.one(
            "SELECT * FROM game_data WHERE user_id = $1",
            [user_id]
        );
        console.log("in /getGameData: Retrieved Game data", data);
        res.json(data);
    } catch (error) {
        console.error("in /getGameData Error : ", error, user_id);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(port);
