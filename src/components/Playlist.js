import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getPlaylist } from "../api";
import { milliToMinutesAndSeconds } from "../utils/utils";

// DELETE THIS: because fetching a single playlist has a limit of 100 songs, we should add a button or a link saying something like "View on Spotify" which will redirect the user to the spotify playlist to see all the songs. This link should be a the top so that the user doesn't have to scroll all the way to the button. Or not.
// Or we can figure out a way to fetch the rest of the songs in a a playlist. We are giving a next property to get the next batch. So we can do something where when a user scrolls far enough we get and display the next batch..

export default function Playlist() {
    let { playlistId } = useParams();
    const [playlist, setPlaylist] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPlaylist = async () => {
            setIsLoading(true);
            const playlistData = await getPlaylist(playlistId);

            setPlaylist(playlistData);
            setIsLoading(false);
        };

        fetchPlaylist();
    }, [playlistId]);

    return playlist && !isLoading ? (
        <div>
            <div className="mt-20 mb-10 flex flex-col gap-8 md:items-end md:flex-row md:max-h-[200px]">
                <img
                    src={playlist.images[0].url}
                    alt=""
                    className="w-48 h-48"
                />
                <div className="flex flex-col gap-5">
                    <span className="uppercase font-semibold text-xs">
                        {playlist.type}
                    </span>
                    {/* how to scale font-size if goes beyond width of its container */}
                    <h1 className="text-3xl lg:text-5xl font-bold">
                        {playlist.name}
                    </h1>
                    <div>
                        <p className="text-sm">
                            {playlist.owner.display_name} -
                            <span className="text-neutral-400">
                                {" "}
                                {playlist.tracks.total} Songs
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full">
                {playlist.tracks.items.map((item, i) => (
                    <div
                        key={i}
                        className="md:h-16 p-3 flex items-center justify-between gap-4 text-sm hover:bg-neutral-800 rounded-md group w-full"
                    >
                        <div className="flex gap-5 items-center">
                            <span className="text-neutral-400 font-semibold text-xs">
                                {i + 1}
                            </span>
                            <img
                                src={item.track.album.images[0]?.url}
                                alt=""
                                className="w-10 h-10"
                            />
                            <div>
                                <h3 className="min-w-[25ch] w-[35ch] truncate text-xs">
                                    {item.track.external_urls.spotify ? (
                                        <a
                                            href={
                                                item.track.external_urls.spotify
                                            }
                                            target={"_blank"}
                                            rel="noreferrer"
                                        >
                                            {item.track.name}
                                        </a>
                                    ) : (
                                        item.track.name
                                    )}
                                </h3>

                                <span className="text-xs text-neutral-400 hover:underline hover:underline-offset-1 group-hover:text-white">
                                    {item.track.artists[0].external_urls
                                        .spotify ? (
                                        <a
                                            href={
                                                item.track.artists[0]
                                                    .external_urls.spotify
                                            }
                                            target={"_blank"}
                                            rel="noreferrer"
                                        >
                                            {item.track.artists[0].name}
                                        </a>
                                    ) : (
                                        item.track.artists[0].name
                                    )}
                                </span>
                            </div>
                        </div>

                        <span
                            className="min-w-[25ch] w-[30ch] truncate text-xs text-neutral-400 hover:underline 
                        hover:text-white hover:underline-offset-1 hidden sm:inline"
                        >
                            <a
                                href={item.track.album.external_urls.spotify}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                {item.track.album.name}
                            </a>
                        </span>
                        <span className=" text-neutral-400 hidden sm:inline">
                            {milliToMinutesAndSeconds(item.track.duration_ms)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p className="text-center">Loading...</p>
    );
}
