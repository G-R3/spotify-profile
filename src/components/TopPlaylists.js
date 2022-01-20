import React, { useEffect, useState } from "react";
import { getUserPlaylist } from "../api/index";

export default function Playlists() {
    const [playlists, setPlaylists] = useState("");

    useEffect(() => {
        const fetchPlaylists = async () => {
            const playlistsData = await getUserPlaylist();

            setPlaylists(playlistsData);
        };

        fetchPlaylists();
    }, []);

    return (
        playlists && (
            <>
                <h2 className="text-lg font-bold mb-5">Your Albums</h2>
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
