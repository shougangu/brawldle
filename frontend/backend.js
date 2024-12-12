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
        console.error("exception updateGuessCount:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};
const login = async (username, password) => {
    try {
        const response = await fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: username, password: password }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return errorData;
        }
        const data = await response.json();
        console.log("Logged in this user", data);
        return data;
    } catch (error) {
        console.log("login exception");
        throw error;
    }
};

const register = async (username, email, password, password2) => {
    try {
        const response = await fetch("http://localhost:4000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
                password2: password2,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return errorData;
        }
        const data = await response.json();
        console.log("Registered this user", data);
        return data;
    } catch (error) {
        console.log("register exception");
        throw error;
    }
};

const getAccessToken = async (refreshToken) => {
    try {
        const response = await fetch("http://localhost:4000/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        console.log("Created Access Token:", data.accessToken);
        return data.accessToken;
    } catch (error) {
        console.log("getAccessToken exception");
        throw error;
    }
};

const userinformation = async (accessToken) => {
    // this function is used to fetch the user information from the server, provided
    // that the user has a valid access Token
    try {
        const response = await fetch(
            "https://brawlstarsdle.onrender.com:3000/userinformation",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (!response.ok) {
            console.log(
                "try: Error with fetching user information, maybe wrong information",
                response
            );
            return null;
        }
        const data = await response.json();
        console.log("Retrieved User Information:", data);
        return data;
    } catch (error) {
        console.log("userinformation exception: Error with fetching ");
        throw error;
    }
};

const logout = async (refreshToken) => {
    try {
        const response = await fetch("http://localhost:4000/logout", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        if (!response.ok) {
            console.log("Deleting user in logout");
            return response;
        }
        console.log("Deleting user in logout");
        return;
    } catch (error) {
        console.log("logout exception");
        throw error;
    }
};
// https://brawlstarsdle.onrender.com/guesscount
// http://localhost:3000/guesscount
