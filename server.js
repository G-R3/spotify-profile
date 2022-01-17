/**
 * Spotify Authorization code flow
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const dotenv = require("dotenv");
dotenv.config();
const express = require("express"); // Express web server framework
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");
const cookieParser = require("cookie-parser");
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = "spotify_auth_state";

const app = express();

app.use(cors()).use(cookieParser());

app.get("/login", function (req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = "user-read-private user-read-email user-follow-read";
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            qs.stringify({
                response_type: "code",
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state,
            }),
    );
});

app.get("/callback", async (req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        console.log("ERROR in /callback");
        res.redirect(
            "http://localhost:3000/?" +
                qs.stringify({
                    error: "state_mismatch",
                }),
        );
    } else {
        res.clearCookie(stateKey);

        console.log("Requesting access and refresh tokens...");
        let response = await axios({
            url: "https://accounts.spotify.com/api/token",
            method: "post",
            params: {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirect_uri,
            },
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                    `${client_id}:${client_secret}`,
                ).toString("base64")}`,
            },
        });

        console.log("Status: ", response.status);
        if (response.status === 200 && !response.error) {
            console.log(response.data);
            let { access_token, refresh_token, expires_in } = response.data;

            res.redirect(
                "http://localhost:3000/?" +
                    qs.stringify({
                        access_token,
                        refresh_token,
                        expires_in,
                    }),
            );
        } else {
            res.redirect(
                "http://localhost:3000/?" +
                    qs.stringify({
                        error: "invalid_token",
                    }),
            );
        }
    }
});

app.get("/refresh_token", async (req, res) => {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;

    let response = await axios({
        url: "https://accounts.spotify.com/api/token",
        method: "post",
        params: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
                `${client_id}:${client_secret}`,
            ).toString("base64")}`,
        },
    });

    if (response.status === 200 && !response.error) {
        let { access_token, expires_in } = response.data;
        res.json({ access_token, expires_in });
    }
});

app.listen(3001, () => {
    console.log("Listening on PORT 3001");
});
