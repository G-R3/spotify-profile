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
        <>
            <div className="mx-auto">
                <h1 className="text-lg font-bold mb-5">Your Playlists</h1>
                <div className="grid grid-cols-5 gap-5 pb-10 rounded-md">
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
                                    className="w-40 h-40 max-w-48 max-h-48 group-hover:shadow-lg"
                                />
                                <div>
                                    <h2 className="font-bold">
                                        {playlist.name}
                                    </h2>
                                    <p className="text-xs text-neutral-400">
                                        {playlist.owner.display_name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    ) : (
        <Loader />
    );
}
