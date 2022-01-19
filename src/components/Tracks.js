import React, { useState, useEffect } from "react";
import { getTopTracks } from "../api";
import { milliToMinutesAndSeconds } from "../utils/utils";

export default function Tracks() {
    const [topTracks, setTopTracks] = useState("");
    const [nextItems, setNextItems] = useState("");
    const [prevItems, setPrevItems] = useState("");

    useEffect(() => {
        const fetchTracks = async () => {
            const { next, items, previous } = await getTopTracks();

            setTopTracks(items);
            setNextItems(next);
            setPrevItems(previous);
        };

        fetchTracks();
    }, []);

    const incrementOffset = async () => {
        if (!nextItems) return;
        const { next, items, previous } = await getTopTracks(nextItems);

        setTopTracks(items);
        setNextItems(next);
        setPrevItems(previous);
    };
    const decrementOffset = async () => {
        if (!prevItems) return;
        const { next, items, previous } = await getTopTracks(prevItems);

        setTopTracks(items);
        setNextItems(next);
        setPrevItems(previous);
    };

    return topTracks ? (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold">Top Tracks</h2>
                <div className="flex">
                    <button
                        onClick={decrementOffset}
                        className="hover:bg-neutral-800 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!prevItems}
                    >
                        &#60;
                    </button>
                    <button
                        onClick={incrementOffset}
                        className="hover:bg-neutral-800 py-1 px-2 rounded  disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!nextItems}
                    >
                        &#62;
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {topTracks.map((track, i) => (
                    <div
                        key={i}
                        className="w-[400px] flex items-center gap-4 text-sm"
                    >
                        <img
                            src={track.album.images[0].url}
                            alt=""
                            className="w-12 h-w-12"
                        />
                        <div className="w-full">
                            <h3 className="flex justify-between">
                                {track.name}
                                <span className=" text-neutral-400">
                                    {milliToMinutesAndSeconds(
                                        track.duration_ms,
                                    )}
                                </span>
                            </h3>
                            <span className="text-xs text-neutral-400">
                                {track.artists[0].name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
}
