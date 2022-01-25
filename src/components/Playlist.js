import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getPlaylist } from "../api";
import { milliToMinutesAndSeconds } from "../utils/utils";

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
        <div className="w-full">
            <div className="mt-20 mb-10 max-h-[200px] flex flex-col gap-8 md:items-end md:flex-row">
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

            <div className="flex flex-col gap-2">
                {playlist.tracks.items.map((item, i) => (
                    <div
                        key={i}
                        className="h-16 p-3 flex items-center justify-between gap-4 text-sm hover:bg-neutral-800 rounded-md group"
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
                            <div className="">
                                <h3 className="flex justify-between min-w-[25ch] w-[35ch]">
                                    <span className="truncate">
                                        {item.track.external_urls.spotify ? (
                                            <a
                                                href={
                                                    item.track.external_urls
                                                        .spotify
                                                }
                                                target={"_blank"}
                                                rel="noreferrer"
                                            >
                                                {item.track.name}
                                            </a>
                                        ) : (
                                            item.track.name
                                        )}
                                    </span>
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
                            className="min-w-[25ch] w-[35ch] truncate text-xs text-neutral-400 hover:underline 
                        hover:text-white hover:underline-offset-1"
                        >
                            <a
                                href={item.track.album.external_urls.spotify}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                {item.track.album.name}
                            </a>
                        </span>
                        <span className=" text-neutral-400">
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
