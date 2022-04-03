import React from "react";
import { Link } from "react-router-dom";

export default function PlaylistCard({ playlist }) {
    return (
        <Link
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
    );
}
