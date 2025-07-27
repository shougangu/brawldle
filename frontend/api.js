const production = true;
const brawlstarsdleBaseURL = production
    ? "https://brawlstarsdle.onrender.com"
    : "http://localhost:3000";

const brawlstarsdleauthBaseURL = production
    ? "https://brawlstarsdleauth.onrender.com"
    : "http://localhost:4000";

const testfetch = async () => {
    fetch(`${brawlstarsdleBaseURL}/api/data`)
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

// ********************************************** authServer.js **********************************//

// refreshToken -> accessToken | null
// used for newAccessToken()
const getAccessToken = async (refreshToken) => {
    console.log("in getAccessToken() api");
    try {
        //
        const response = await fetch(`${brawlstarsdleauthBaseURL}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
        });
        if (!response.ok) {
            console.log("getAccessToken error", response);
            return null;
        }
        const data = await response.json();
        console.log(
            "getAccessToken return the accesstoken :",
            data.accessToken
        );
        return data.accessToken;
    } catch (error) {
        console.log("getAccessToken exception", error);
        throw error;
    }
};
const register = async (username, email, password, password2) => {
    console.log("in register() api.js");
    try {
        const response = await fetch(
            `${brawlstarsdleauthBaseURL}/users/register`,
            {
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
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            console.log("in register() error : ", errorData);
            return errorData;
        }
        const data = await response.json();
        console.log("in register() : successfully registered user", data);
        return data;
    } catch (error) {
        console.log("in register() exception : ", error);
        throw error;
    }
};
const login = async (username, password) => {
    // username, password -> {username: __, accessToken: __, refreshToken: ___} || error
    console.log("in login() api");
    try {
        const response = await fetch(
            `${brawlstarsdleauthBaseURL}/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: username, password: password }),
            }
        );
        if (!response.ok) {
            const errorData = await response.json(); // errorData in form {error: __}
            console.log("login() error : ", errorData);
            return errorData;
        }
        const data = await response.json();
        console.log("login() return : ", data);
        return data;
    } catch (error) {
        console.log("login() exception", error);
        throw error;
    }
};
const logout = async (refreshToken) => {
    // returns are never used
    // refreshToken -> null | error
    console.log("in logout() api");
    try {
        const response = await fetch(`${brawlstarsdleauthBaseURL}/logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            },
        });
        if (!response.ok) {
            console.log("Deleting user in logout error");
            return { error: response }; // HTTP response status such as 4xx/5xx based on res.sendStatus(XXX)
        }
        console.log("Deleting user in logout");
        return;
    } catch (error) {
        console.log("logout exception");
        return { error: error };
    }
};

// ********************************************** server.js **********************************//

// send the guess count data to server, returns the updated guess count data in lst forrmat
// input guess ranging from 1 to 8, with 8 being a placeholder for not counting
const updateGuessCount = async (guesses) => {
    console.log("in updateGuessCount() api");
    try {
        console.log("in updateGuess API COUNT INPUT", guesses);
        const response = await fetch(`${brawlstarsdleBaseURL}/guesscount`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ guesses: guesses }), // Ensure the body key is a JSON string
        });

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
const userinformation = async (accessToken) => {
    // fetch the user information from the server, provided
    // that the user has a valid access Token
    // this is used in validateUser() and login waiter
    // handled through /userinformation + (authenticateServer middleware)
    // accessToken -> userInformation | null
    console.log("in userinformation() api");
    try {
        const response = await fetch(
            `${brawlstarsdleBaseURL}/userinformation`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (!response.ok) {
            // if the response is not ok (HTTP error), then return null lpractice
            console.log(
                "try: Error with fetching user information, maybe wrong information",
                response
            );
            return null;
        }
        const data = await response.json();
        console.log("userinformation() Retrieved User Information:", data);
        return data;
    } catch (error) {
        console.log("userinformation() exception: Error with fetching ", error);
        return null;
    }
};

// handled through /insertGameData (authenticateServer middleware)
// accessToken, daily, normal, hard -> null | error
const insertGameData = async (accessToken) => {
    console.log("in insertGameData() api.js");
    try {
        const response = await fetch(`${brawlstarsdleBaseURL}/insertGameData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                daily: localStorage.getItem("currentGame"),
                normal: localStorage.getItem("currentNormalGame"),
                hard: localStorage.getItem("currentHardGame"),
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return errorData;
        }
        const data = await response.json();
        console.log("in insertGameData() : returning", data);
        return data;
    } catch (error) {
        console.log("in insertGameData() error : ", error);
        throw error;
    }
};

const getGameData = async (accessToken) => {
    // API call handled through /getGameData (authenticateServer middleware)
    // accessToken -> gameData | null
    console.log("in getGameData() api.js");

    try {
        const response = await fetch(`${brawlstarsdleBaseURL}/getGameData`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            console.log("in getGameData() error : ", response);
            return null;
        }
        const data = await response.json();
        console.log("in getGameData() returning: ", data);
        return data;
    } catch (error) {
        console.log("in getGameData() error : ", error);
        return null;
    }
};
