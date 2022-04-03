import axios from "axios";

// get tokens and save tokens to localstorag
const setToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
};
const setRefreshToken = (refreshToken) => {
    localStorage.setItem("refresh_token", JSON.stringify(refreshToken));
};
const setExpiresIn = (expiresIn) => {
    localStorage.setItem("expires_in", JSON.stringify(expiresIn));
};
const getToken = () => {
    return JSON.parse(localStorage.getItem("token"));
};
const getRefreshToken = () => {
    return JSON.parse(localStorage.getItem("refresh_token"));
};
const getExpiresIn = () => {
    return JSON.parse(localStorage.getItem("expires_in"));
};

const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error("Invalid refresh token");
        }
        const response = await axios.get(
            `http://localhost:3001/refresh_token?refresh_token=${refreshToken}`,
        );
        const { access_token, expires_in } = response.data;

        setToken(access_token);
        setRefreshToken(refreshToken);
        setExpiresIn(Date.now() + expires_in * 1000);
    } catch (err) {
        console.log(err.message);
    }
};

// parse the url
const parseUrl = () => {
    let params = new URLSearchParams(window.location.search);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const expires_in = params.get("expires_in");

    return { access_token, refresh_token, expires_in };
};

const getAccessToken = () => {
    const { access_token, refresh_token, expires_in } = parseUrl();
    const savedToken = getToken();

    // TODO: handle token expiration
    if (Date.now() > getExpiresIn() && getRefreshToken()) {
        console.log("Token expired. Requesting and setting new token...");
        refreshAccessToken();
        return savedToken;
    }

    if (!savedToken && access_token) {
        console.log(
            "Token does not exist. Requesting and setting new token...",
        );
        setRefreshToken(refresh_token);
        refreshAccessToken();

        return access_token;
    }

    console.log("returning saved token...");
    return savedToken;
};

let token = getAccessToken();
let headers = {
    Authorization: `Bearer ${token}`,
};

export { token, headers };