import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPlaylists } from "../api";
import Loader from "./Loader";
import { FaHeart } from "react-icons/fa";

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
                <Link
                    to="/saved"
                    className="sm:col-span-2 rounded-md py-5 bg-gradient-to-tl from-sky-500 to-indigo-500 flex flex-col items-center justify-center gap-5 hover:cursor-pointer hover:shadow-lg"
                >
                    <FaHeart className="text-5xl" />
                    <h2 className="text-2xl font-bold">Liked Songs</h2>
                </Link>
                {playlists.map((playlist, i) => (
                    <Link
                        key={playlist.id}
                        to={`/playlist/${playlist.id}`}
                        className="p-4 rounded-md text-sm bg-neutral-900 shadow-lg hover:bg-neutral-800 transition-all group"
                    >
                        <div className="">
                            <div className="relative mb-4">
                                <div className="relative pb-[100%] w-full">
                                    <div>
                                        <img
                                            src={playlist.images[0]?.url}
                                            alt=""
                                            className="block h-full lef-0 top-0 absolute w-full group-hover:shadow-lg"
                                        />
                                    </div>
                                </div>
                            </div>
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
