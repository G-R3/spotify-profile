import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getUserPlaylists } from "../api";

export default function Playlists() {
    const [playlists, setPlaylists] = useState("");
    useEffect(() => {
        const fetchAllPlaylists = async () => {
            const { items } = await getUserPlaylists();

            setPlaylists(items);
        };

        fetchAllPlaylists();
    }, []);

    return playlists ? (
        <div className="px-5 mx-auto max-w-5xl">
            <h1 className="text-lg font-bold mb-5">Your Playlists</h1>
            <div className="flex flex-wrap gap-10">
                {playlists.map((playlist, i) => (
                    <Link key={i} to={`/playlists/${playlist.id}`}>
                        <img
                            src={playlist.images[0].url}
                            alt=""
                            className="w-24 h-24 lg:w-48 lg:h-48"
                        />
                    </Link>
                ))}
            </div>
            <Outlet />
        </div>
    ) : (
        <h1>Loading...</h1>
    );
}
