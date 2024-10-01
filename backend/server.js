import express from "express";
import cors from "cors";
import pgPromise from "pg-promise";

const app = express();
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
};
const stringtoguess = {
    guess1: 1,
    guess2: 2,
    guess3: 3,
    guess4: 4,
    guess5: 5,
    guess6: 6,
    guess7: 7,
};

/* Database -------------------------------------------------*/
const pgp = pgPromise();
//const dblocal = pgp("postgres://postgres@localhost:5431/postgres");
const dbConfig = {
    host: "your-database-host",
    port: 5432,
    database: "your-database-name",
    user: "your-database-user",
    password: "your-database-password",
    ssl: {
        rejectUnauthorized: false, // This is for development purposes only. In production, you should use a proper certificate.
    },
};
const db = pgp("postgres://postgres@localhost:5431/postgres");
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

const insertQuery =
    "INSERT INTO guesses (dayNumb, guess1, guess2, guess3, guess4, guess5, guess6, guess7) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

// ensure that the currentDate is created in the database
const createDayNumb = async (dayNumb, insertQuery) => {
    try {
        // result is a bool, checks if the current dayNumb is stored in the database
        const result = await db.one(
            "SELECT EXISTS(SELECT 1 FROM guesses WHERE dayNumb = $1) AS exists",
            [dayNumb]
        );
        const exists = result.exists;

        if (!exists) {
            await db.none(insertQuery, [dayNumb, 0, 0, 0, 0, 0, 0, 0]);
            console.log("Row added successfully");
        }
    } catch (error) {
        console.log("ERROR:", error);
    }
};
createDayNumb(dayNumb, insertQuery);
createDayNumb(dayNumb + 1, insertQuery);

//calls upon database to increment the number of guesses by 1
const incrementGuess = async (dayNumb, guesses, guesstostring) => {
    let str = guesstostring[guesses];
    try {
        await db.none(
            `UPDATE guesses SET ${str} = ${str} + 1 WHERE dayNumb = $1`,
            [dayNumb]
        );
        console.log("incrementGuess()");
    } catch (error) {
        console.log("ERROR", error);
    }
};
const getGuesses = async (dayNumb) => {
    // there is an issue here with .one
    try {
        console.log(dayNumb);
        const data = await db.any("SELECT * FROM guesses WHERE dayNumb = $1", [
            dayNumb,
        ]);
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
    if (index === undefined || index < 1 || index >= 8) {
        return res.status(400).json({ error: "Invalid index" });
    }

    incrementGuess(dayNumb, index, guesstostring);
    var s = await getGuesses(dayNumb);
    res.json({ today: s });
});

app.listen(port);
