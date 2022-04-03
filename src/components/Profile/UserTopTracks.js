import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import useGetItems from "../../hooks/useGetItems";
import TrackItem from "../Playlists/TrackItem";

export default function UserTopTracks({ tracks }) {
    let { data, getNext, getPrevious } = useGetItems(tracks);

    return data ? (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold">Top tracks this month</h2>
                <div className="flex">
                    <button
                        onClick={() => getPrevious(data.previous)}
                        className="hover:bg-neutral-800 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!data.previous}
                    >
                        <AiOutlineArrowLeft />
                    </button>
                    <button
                        onClick={() => getNext(data.next)}
                        className="hover:bg-neutral-800 py-1 px-2 rounded  disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!data.next}
                    >
                        <AiOutlineArrowRight />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {data.items.map((track, i) => (
                    <TrackItem key={track.id ? track.id : i} track={track} />
                ))}
            </div>
        </div>
    ) : (
        <p className="w-full lg:w-[400px] h-16 text-center">Loading...</p>
    );
}
