import React from "react";
import { Link } from "react-router-dom";

export default function Artist({ artist }) {
    return (
        <Link
            to={`/artist/${artist.id}`}
            className="flex flex-col items-center py-5 rounded-md text-sm bg-neutral-900 shadow-lg hover:bg-neutral-800 transition-all group"
        >
            <div className="flex flex-col gap-5">
                <img
                    src={artist.images[0].url}
                    alt=""
                    className="w-48 h-48 rounded-full group-hover:shadow-lg"
                />
                <div>
                    <h3 className="font-bold one-line-ellipsis">
                        {artist.name}
                    </h3>
                    <p className="capitalize text-xs text-neutral-400">
                        {artist.type}
                    </p>
                </div>
            </div>
        </Link>
    );
}
