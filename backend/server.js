import express from "express";
import cors from "cors";
import pgPromise from "pg-promise";
import dotenv from "dotenv";

const app = express();
const pgp = pgPromise();
dotenv.config();
app.use(cors());
app.use(express.json());
const port = 3000;
const dayNumb = Math.floor(new Date() / 8.64e7) - 19703;
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

/* Database -------------------------------------------------*/
const Host = process.env.PG_HOST;
const Database = process.env.PG_DATABASE;
const UserName = process.env.PG_USER;
const Password = process.env.PG_PASSWORD;
const DBPort = process.env.PG_PORT;
//const connectionString = `postgres://${UserName}:${Password}@${Host}:${DBPort}/${Database}`;
const connectionString = process.env.PG_URL;
//const connectionString = "postgres://postgres@localhost:5431/postgres";
const db = pgp(connectionString);

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

// creates a row for the current day
const createDayNumb = async () => {
    try {
        console.log("In createDayNumb()");
        // result is a bool, checks if the current dayNumb is stored in the database
        const result = await db.one(
            'SELECT EXISTS(SELECT 1 FROM guesses WHERE "dayNumb" = $1) AS exists',
            [dayNumb]
        );
        const exists = result.exists;

        if (!exists) {
            await db.none(insertQuery, [dayNumb, 0, 0, 0, 0, 0, 0, 0]);
        }
    } catch (error) {
        console.log("ERROR:", error);
    }
};

//calls upon database to increment the number of guesses by 1
const incrementGuess = async (guesses) => {
    console.log("In incrementGuess()");
    // await createDayNumb();
    // await createDayNumb(dayNumb + 1, insertQuery);
    let str = guesstostring[guesses];
    console.log("In incrementGuess()", str);
    try {
        await db.none(
            `UPDATE guesses SET ${str} = ${str} + 1 WHERE "dayNumb" = $1`,
            [dayNumb]
        );
        console.log("Incremnted Successfully");
    } catch (error) {
        console.log("ERROR", error);
    }
};

// calls upon database to retrieve a specific row
const getGuesses = async (dayNumbLocal) => {
    // there is an issue here with .one
    try {
        console.log("In getGuesses()");
        const data = await db.any(
            'SELECT * FROM guesses WHERE "dayNumb" = $1',
            [dayNumbLocal]
        );
        return data;
    } catch (error) {
        console.error("ERROR:", error);
        throw error;
    }
};
/* Routing ------------------------------------------------------*/

app.get("/", (req, res) => {
    res.status(500).send("Express server is running!");
});

//We can call the fetch method from the frontend pages (html, js) to process the data on the server side (such as through the json file)
app.put("/guesscount", async (req, res) => {
    const index = parseInt(req.body.guesses); // Extract index from request body
    if (index === undefined || index < 1 || index >= 9) {
        return res.status(400).json({ error: "Invalid index" });
    }

    await incrementGuess(index);
    var s = await getGuesses(dayNumb);
    res.json({ today: s });
});

app.listen(port);
