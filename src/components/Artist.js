import React from "react";

export default function Artist({ artist }) {
    return (
        <div className="w-full xl:w-[400px] h-16 flex items-center gap-4 text-sm">
            <img
                src={artist.images[0].url}
                alt=""
                className="w-12 h-12 rounded-full"
            />
            <h3 className="flex justify-between">{artist.name}</h3>
        </div>
    );
}
