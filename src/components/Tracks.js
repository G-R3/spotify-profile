import React, { useState, useEffect } from "react";
import { getTopTrack } from "../api";
import { milliToMinutesAndSeconds } from "../utils/utils";

export default function Tracks() {
    const [topTracks, setTopTracks] = useState("");

    useEffect(() => {
        const fetchTracks = async () => {
            const topTrackData = await getTopTrack();
            setTopTracks(topTrackData);
        };

        fetchTracks();
    }, []);

    return topTracks ? (
        <div>
            <h2 className="text-lg font-bold mb-5">Top Tracks</h2>
            <div className="flex flex-col gap-5">
                {topTracks.items.map((track, i) => (
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
