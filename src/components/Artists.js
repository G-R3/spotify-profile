import React, { useState, useEffect } from "react";
import { getTopArtists } from "../api";

export default function Artists() {
    const [topArtists, setTopArtists] = useState("");
    const [nextItems, setNextItems] = useState("");
    const [prevItems, setPrevItems] = useState("");

    useEffect(() => {
        const fetchArtists = async () => {
            const { next, items, previous } = await getTopArtists();

            setTopArtists(items);
            setNextItems(next);
            setPrevItems(previous);
        };

        fetchArtists();
    }, []);

    const incrementOffset = async () => {
        if (!nextItems) return;
        const { next, items, previous } = await getTopArtists(nextItems);

        setTopArtists(items);
        setNextItems(next);
        setPrevItems(previous);
    };
    const decrementOffset = async () => {
        if (!prevItems) return;
        const { next, items, previous } = await getTopArtists(prevItems);
        setTopArtists(items);
        setNextItems(next);
        setPrevItems(previous);
    };

    return topArtists ? (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Top Artists</h2>
                <div className="">
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
