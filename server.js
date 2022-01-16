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
    const scope = "user-read-private user-read-email";
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
            "/#" +
                qs.stringify({
                    error: "state_mismatch",
                }),
        );
    } else {
        res.clearCookie(stateKey);

        console.log("Requesting access and refresh token...");
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

        if (response.status === 200 && !response.error) {
            console.log(response.status);
            const { access_token, refresh_token, expires_in } = response.data;

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
                "http://localhost:3000//?" +
                    qs.stringify({
                        error: "invalid_token",
                    }),
            );
        }
    }
});

app.get("/refresh_token", function (req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${client_id}:${client_secret}`,
            ).toString("base64")}`,
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        },
        json: true,
    };

    axios.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                access_token: access_token,
            });
        }
    });
});

console.log("Listening on 3001");
app.listen(3001);
