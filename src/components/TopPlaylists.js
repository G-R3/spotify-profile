import React, { useEffect, useState } from "react";
import { getUserPlaylists } from "../api/index";

export default function TopPlaylists() {
    const [playlists, setPlaylists] = useState("");

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlistsData = await getUserPlaylists();

            setPlaylists(playlistsData);
        };

        fetchPlaylists();
    }, []);

    return (
        playlists && (
            <>
                <h2 className="text-lg font-bold mb-5">Your Playlists</h2>
                <div className="flex overflow-x-scroll gap-5 pb-10 slider-scrollbar rounded-md">
                    {playlists.items.map((playlist, i) => (
                        <img
                            key={i}
                            src={playlist.images[0].url}
                            alt=""
                            className="w-24 h-24 lg:w-48 lg:h-48"
                        />
                    ))}
                </div>
            </>
        )
    );
}
