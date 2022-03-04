import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getArtistAlbumTracks, getPlaylist } from "../api";
import Loader from "./Loader";
import TrackItem from "./TrackItem";
import getImageColor from "../utils/imageColor";

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
                <Link
                    to={"/profile"}
                    className="text-sm font-semibold hover:underline hover:underline-offset-1"
                >
                    {playlist.owner.display_name}
                </Link>
                <span> - {playlist.tracks.total} songs</span>
            </div>
        );
    } else if (playlist.artists) {
        const releaseYear = new Date(playlist.release_date).getFullYear();
        subheading = (
            <div>
                <Link
                    to={`/artist/${playlist.artists[0]?.id}`}
                    className="text-sm font-semibold hover:underline hover:underline-offset-1"
                >
                    {playlist.artists[0]?.name}
                </Link>
                <span> - {releaseYear} - </span>
                <span>{playlist.tracks.total} Songs</span>
            </div>
        );
    }

    return playlist && !isLoading ? (
        <div className="max-w-[1500px] mx-auto">
            <div
                style={{
                    backgroundColor: imageColor,
                }}
                className="rounded-md py-20 px-10 mb-10 flex flex-col gap-8 md:items-center md:flex-row bg-gradient-to-t from-neutral-800"
            >
                <img
                    src={playlist.images[0]?.url}
                    alt=""
                    className="w-48 h-48 shadow-lg"
                />
                <div className="flex flex-col gap-5">
                    <span className="uppercase font-semibold text-xs">
                        {playlist.type}
                    </span>
                    {/* how to scale font-size if goes beyond width of its container */}
                    <h1 className="text-3xl lg:text-5xl font-bold">
                        {playlist.name}
                    </h1>
                    {playlist.description && (
                        <p className="text-neutral-400">
                            {playlist.description}
                        </p>
                    )}
                    <div className="flex flex-col items-center sm:flex-row gap-5">
                        {subheading}

                        {playlist.external_urls && (
                            <a
                                href={playlist.external_urls.spotify}
                                target={"_blank"}
                                className="text-center bg-spotify-green p-2 rounded-full text-sm active:ring-2 active:ring-offset-2 active:ring-offset-black hover:ring-2 hover:ring-offset-2 hover:ring-offset-black transition-all"
                                rel="noreferrer"
                            >
                                View on Spotify
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full">
                {playlist.tracks.items.map((item, i) => {
                    const track = item.track ? item.track : item;

                    return (
                        <TrackItem
                            key={track.id ? track.id : i}
                            track={track}
                            index={i}
                        />
                    );
                })}
            </div>
        </div>
    ) : (
        <Loader />
    );
}
