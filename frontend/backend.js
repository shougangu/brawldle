const testfetch = async () => {
    fetch("http://localhost:3000/api/data")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching data:", error));
};
// send the guess count data to server, returns the updated guess count data in lst forrmat
// input guess ranging from 1 to 8, with 8 being a placeholder for not counting
const updateGuessCount = async (guesses) => {
    try {
        console.log("updateGuessCOUNT INPUT", guesses);
        const response = await fetch(
            "https://brawlstarsdle.onrender.com/guesscount",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ guesses: guesses }), // Ensure the body key is a JSON string
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const r = await response.json(); // Parse the JSON from the response
        return r; // Return the parsed JSON data
    } catch (error) {
        console.error("Error updating data:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

// https://brawlstarsdle.onrender.com/guesscount
// http://localhost:3000/guesscount
