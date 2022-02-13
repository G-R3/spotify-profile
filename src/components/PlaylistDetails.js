import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { getPlaylist } from "../api";
import Loader from "./Loader";
import TrackItem from "./TrackItem";

export default function PlaylistDetails() {
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
                    src={playlist.images[0]?.url}
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
                {playlist.tracks.items.map((item, i) => {
                    const { track } = item;
                    return (
                        <TrackItem
                            key={track.id ? track.id : i}
                            track={track}
                            index={i + 1}
                        />
                    );
                })}
            </div>
        </div>
    ) : (
        <Loader />
    );
}
