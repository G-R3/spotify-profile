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
        <div className="mt-20 max-h-[200px] w-full flex flex-col gap-12">
            <div className="flex flex-col gap-8 md:items-end md:flex-row">
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
                        <span className="text-sm">
                            {playlist.owner.display_name} -{" "}
                            {playlist.tracks.total} Songs
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {playlist.tracks.items.map((item, i) => (
                    <div
                        key={i}
                        className="w-full h-16 flex items-center gap-4 text-sm "
                    >
                        <img
                            src={item.track.album.images[0]?.url}
                            alt=""
                            className="w-12 h-12"
                        />
                        <div className="w-full">
                            <h3 className="flex justify-between">
                                {item.track.name}
                                <span className=" text-neutral-400">
                                    {milliToMinutesAndSeconds(
                                        item.track.duration_ms,
                                    )}
                                </span>
                            </h3>
                            <span className="text-xs text-neutral-400">
                                {item.track.artists[0].name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p className="text-center">Loading...</p>
    );
}
