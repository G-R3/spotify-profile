import React from "react";
import useGetItems from "../hooks/useGetItems";
import { getTopArtists } from "../api";

export default function Artists() {
    const [topArtists, getNext, getPrevious, hasNext, hasPrevious] =
        useGetItems(getTopArtists);

    return topArtists ? (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Top Artists</h2>
                <div className="">
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
            <div className="flex flex-col gap-5">
                {topArtists.map((artist, i) => (
                    <div
                        key={i}
                        className="w-[400px] flex items-center gap-4 text-sm"
                    >
                        <img
                            src={artist.images[0].url}
                            alt=""
                            className="w-12 h-12 rounded-full"
                        />
                        <h3 className="flex justify-between">{artist.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p>Loading...</p>
    );
}
