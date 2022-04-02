import React from "react";
import { Link } from "react-router-dom";

export default function AlbumCard({ album }) {
    return (
        <Link
            to={`/album/${album.id}`}
            className="flex flex-col items-center py-5 px-2 rounded-md text-sm bg-neutral-900 shadow-lg hover:bg-neutral-800 transition-all group"
        >
            <div className="flex flex-col gap-5">
                <div className="relative mb-4">
                    <div className="relative pb-[100%] w-full">
                        <div>
                            <img
                                src={album.images[0]?.url}
                                alt=""
                                className="rounded-md block h-full lef-0 top-0 absolute w-full group-hover:shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold truncate w-[25ch]">
                        {album.name}
                    </h2>
                    <p className="text-neutral-400 font-semibold mt-1">
                        {new Date(album.release_date).getFullYear()} -{" "}
                        <span>{album.type}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}
