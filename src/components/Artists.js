import React, { useState, useEffect } from "react";
import { getTopArtists } from "../api";

export default function Artists() {
    const [topArtists, setTopArtists] = useState("");

    useEffect(() => {
        const fetchArtists = async () => {
            const topArtistsData = await getTopArtists();
            setTopArtists(topArtistsData);
        };

        fetchArtists();
    }, []);

    return topArtists ? (
        <div>
            <h2 className="text-lg font-bold mb-5">Top Artists</h2>
            <div className="flex flex-col gap-5">
                {topArtists.items.map((artist, i) => (
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
