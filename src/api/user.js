import axios from "axios";
import { headers } from "./token";

const getUser = async () => {
    return axios.get("https://api.spotify.com/v1/me", {
        headers,
    });
};

const getFollowing = async () => {
    return axios.get("https://api.spotify.com/v1/me/following?type=artist", {
        headers,
    });
};

const getTopTracks = async () => {
    return axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term",
        {
            headers,
        },
    );
};
const getTopArtists = async () => {
    return await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term",
        {
            headers,
        },
    );
};
const getUserPlaylists = async (
    url = "https://api.spotify.com/v1/me/playlists",
    data = [],
) => {
    let response = await axios.get(url, {
        headers,
    });
    // let result = [...data, ...response.data.items];
    let result = data.concat(response.data.items);

    if (response.data.next) {
        return getUserPlaylists(response.data.next, result);
    }

    return result;
};
const getUserSavedTracks = async () => {
    const response = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
        headers,
    });

    return response.data;
};

const getPlaylist = async (playlistId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
            headers,
        },
    );

    return response.data;
};

const getUserData = () => {
    return axios
        .all([getUser(), getFollowing(), getTopArtists(), getTopTracks()])
        .then(
            axios.spread((user, following, artists, tracks) => {
                const data = {
                    user: user.data,
                    following: following.data,
                    topArtists: artists.data,
                    topTracks: tracks.data,
                };

                return data;
            }),
        );
};

const getItems = async (url) => {
    let response = await axios.get(url, {
        headers,
    });

    return response.data;
};

export {
    getUserData,
    getUserPlaylists,
    getUserSavedTracks,
    getPlaylist,
    getItems,
};
