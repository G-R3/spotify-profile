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
        setExpiresIn(expires_in * 1000 - 60000);
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

    if (access_token && refresh_token && expires_in) {
        setToken(access_token);
        setRefreshToken(refresh_token);
        setExpiresIn(expires_in * 1000 - 60000);
        return access_token;
    }

    let expireTime = getExpiresIn();

    // token expired
    if (Date.now() >= expireTime) {
        console.log("Token has expired. Requesting a new token...");
        refreshAccessToken();
        return getToken();
    }

    // if no token is saved
    const token = getToken();
    if (!token) {
        console.log("Token does not exist. Requesting a new token...");
        refreshAccessToken();
        return getToken();
    }

    return token;
};

let token = getAccessToken();
let headers = {
    Authorization: `Bearer ${token}`,
};

export { token, headers };
