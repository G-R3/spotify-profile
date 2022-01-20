import React from "react";
import { getTopTracks } from "../api";
import { milliToMinutesAndSeconds } from "../utils/utils";
import useGetItems from "../hooks/useGetItems";

export default function Tracks() {
    const [topTracks, getNext, getPrevious, hasNext, hasPrevious] =
        useGetItems(getTopTracks);
    return topTracks ? (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold">Top Tracks</h2>
                <div className="flex">
                    <button
                        onClick={getPrevious}
                        className="hover:bg-neutral-800 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!hasPrevious}
                    >
                        &#60;
                    </button>
                    <button
                        onClick={getNext}
                        className="hover:bg-neutral-800 py-1 px-2 rounded  disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!hasNext}
                    >
                        &#62;
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {topTracks.map((track, i) => (
                    <div
                        key={i}
                        className="w-full xl:w-[400px] h-16 flex items-center gap-4 text-sm "
                    >
                        <img
                            src={track.album.images[0].url}
                            alt=""
                            className="w-12 h-12"
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
