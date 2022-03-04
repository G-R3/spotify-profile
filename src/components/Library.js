import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPlaylists } from "../api";
import Loader from "./Loader";

export default function Library() {
    let [playlists, setPlaylists] = useState("");
    useEffect(() => {
        const fetchAllPlaylists = async () => {
            const playlists = await getUserPlaylists();

            setPlaylists(playlists);
        };

        fetchAllPlaylists();
    }, []);
    return playlists ? (
        <div className="py-10 px-5">
            <h1 className="text-lg font-bold mb-5">Your Playlists</h1>
            <div className="grid grid-cols-auto-fit gap-10 pb-10">
                {playlists.map((playlist, i) => (
                    <Link
                        key={playlist.id}
                        to={`/playlist/${playlist.id}`}
                        className="flex flex-col items-center py-5 rounded-md text-sm bg-neutral-900 shadow-lg hover:bg-neutral-800 transition-all group"
                    >
                        <div className="flex flex-col gap-5">
                            <img
                                src={playlist.images[0]?.url}
                                alt=""
                                className="w-48 h-48 group-hover:shadow-lg"
                            />
                            <div>
                                <h2 className="font-bold">{playlist.name}</h2>
                                <p className="text-xs text-neutral-400 mt-2">
                                    {playlist.owner.display_name}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) : (
        <Loader />
    );
}
