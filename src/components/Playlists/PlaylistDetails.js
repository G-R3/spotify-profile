import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { getArtistAlbumTracks } from "../../api/artist";
import { getPlaylist } from "../../api/user";
import Loader from "../Loader";
import getImageColor from "../../utils/imageColor";
import Playlist from "./Playlist";

export default function PlaylistDetails() {
    const param = useParams();
    const [playlist, setPlaylist] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [imageColor, setImageColor] = useState("");

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (param.playlistId) {
                const playlistData = await getPlaylist(param.playlistId);
                setPlaylist(playlistData);
            } else if (param.albumId) {
                const playlistData = await getArtistAlbumTracks(param.albumId);
                setPlaylist(playlistData);
            }
            setIsLoading(false);
        };

        fetchPlaylist();
    }, [param]);

    useEffect(() => {
        if (!playlist) {
            return;
        }
        const getColor = async () => {
            let color = await getImageColor(playlist.images[0]?.url);
            setImageColor(color);
        };

        getColor();
    }, [playlist]);

    let subheading;
    if (playlist.owner) {
        subheading = (
            <div>
                <span to={"/"} className="text-sm font-bold">
                    {playlist.owner.display_name}
                </span>
                <span> - {playlist.tracks.total} songs</span>
            </div>
        );
    } else if (playlist.artists) {
        const releaseYear = new Date(playlist.release_date).getFullYear();
        subheading = (
            <div className="flex items-center gap-2">
                <Link
                    to={`/artist/${playlist.artists[0]?.id}`}
                    className="text-sm font-semibold hover:underline hover:underline-offset-1"
                >
                    {playlist.artists[0]?.name}
                </Link>
                <GoPrimitiveDot size={10} />
                <span>{releaseYear}</span>
                <GoPrimitiveDot size={10} />
                <span>{playlist.tracks.total} Songs</span>
            </div>
        );
    }

    return playlist && !isLoading ? (
        <Playlist
            playlist={playlist}
            subheading={subheading}
            imageColor={imageColor}
        />
    ) : (
        <Loader />
    );
}
