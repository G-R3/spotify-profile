import axios from "axios";
import { header } from "./token";

const getArtist = async (artistId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
            header,
        },
    );

    return response.data;
};
const getArtistTopTrack = async (artistId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
        {
            header,
        },
    );

    return response.data;
};
const getArtistAlbums = async (artistId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums?market=ES&include_groups=album`,
        {
            header,
        },
    );

    return response.data;
};
const getArtistAlbumTracks = async (albumId) => {
    const response = await axios.get(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
            header,
        },
    );

    return response.data;
};

export { getArtist, getArtistTopTrack, getArtistAlbums, getArtistAlbumTracks };
