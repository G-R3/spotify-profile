import axios from "axios";
import { headers } from "./token";

const getArtist = async (artistId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
            headers,
        },
    );

    return response.data;
};
const getArtistTopTrack = async (artistId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
        {
            headers,
        },
    );

    return response.data;
};
const getArtistAlbums = async (artistId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums?market=ES&include_groups=album`,
        {
            headers,
        },
    );

    return response.data;
};
const getArtistAlbumTracks = async (albumId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
            headers,
        },
    );

    return response.data;
};

export { getArtist, getArtistTopTrack, getArtistAlbums, getArtistAlbumTracks };
