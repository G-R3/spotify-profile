import React from "react";
import { milliToMinutesAndSeconds } from "../utils/utils";
import useGetItems from "../hooks/useGetItems";

export default function TopTracks({ tracks }) {
    let { data, getNext, getPrevious } = useGetItems(tracks);

    return data ? (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold">Top Tracks</h2>
                <div className="flex">
                    <button
                        onClick={() => getPrevious(data.previous)}
                        className="hover:bg-neutral-800 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!data.previous}
                    >
                        &#60;
                    </button>
                    <button
                        onClick={() => getNext(data.next)}
                        className="hover:bg-neutral-800 py-1 px-2 rounded  disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!data.next}
                    >
                        &#62;
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {data.items.map((track, i) => (
                    <div
                        key={track.id ? track.id : i}
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
        <p className="w-full lg:w-[400px] h-16 text-center">Loading...</p>
    );
}
