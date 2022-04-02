import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPlaylists } from "../../api/index";
import { getItems } from "../../api/index";
import Loader from "../Loader";

export default function UserPlaylists() {
    const [playlists, setPlaylists] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPlaylists = async () => {
            const { items, next, total } = await getUserPlaylists();
            setPlaylists({ items, next, total });
        };

        fetchPlaylists();
    }, []);

    const getNext = async (url) => {
        setLoading(true);
        const { items, next, total } = await getItems(url);
        setPlaylists((prevState) => ({
            items: [...prevState.items, ...items],
            next,
            total,
        }));
        setLoading(false);
    };

    return playlists ? (
        <>
            <div className="flex items-center mb-5 gap-1">
                <h2 className="text-lg font-bold">Your Playlists </h2>
                <span className="bg-neutral-800 text-xs p-1 rounded-full self-start">
                    {playlists.total}
                </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {playlists.items.map((playlist, i) => (
                    <Link
                        key={playlist.id}
                        to={`/playlists/${playlist.id}`}
                        className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-48 xl:h-48"
                    >
                        <img
                            src={playlist.images[0]?.url}
                            alt=""
                            className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-48 xl:h-48"
                        />
                    </Link>
                ))}
            </div>
            {playlists.next &&
                (loading ? (
                    <Loader />
                ) : (
                    <button
                        onClick={() => getNext(playlists.next)}
                        className="bg-neutral-800 text-spotify-green mt-8 mx-auto block p-2 rounded-md"
                    >
                        Load More
                    </button>
                ))}
        </>
    ) : (
        <Loader />
    );
}
