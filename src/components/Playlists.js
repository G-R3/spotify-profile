import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getUserPlaylists } from "../api";

export default function Playlists() {
    let [playlists, setPlaylists] = useState("");
    useEffect(() => {
        const fetchAllPlaylists = async () => {
            const { items } = await getUserPlaylists();

            setPlaylists(items);
        };

        fetchAllPlaylists();
    }, []);

    return playlists ? (
        <div className="px-5 mx-auto">
            <h1 className="text-lg font-bold mb-5">Your Playlists</h1>
            <div className="flex overflow-x-scroll gap-5 pb-10 slider-scrollbar rounded-md">
                {playlists.map((playlist, i) => (
                    <div className="" key={i}>
                        <Link
                            to={`/playlists/${playlist.id}`}
                            className="flex w-24 h-24 lg:w-48 lg:h-48"
                        >
                            <img
                                src={playlist.images[0].url}
                                alt=""
                                className="w-full"
                            />
                        </Link>
                    </div>
                ))}
            </div>

            <Outlet />
        </div>
    ) : (
        <p className="text-center">Loading...</p>
    );
}
