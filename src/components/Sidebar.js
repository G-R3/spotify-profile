import React from "react";

export default function Sidebar() {
    return (
        <nav className="bg-black h-screen fixed w-48 top-0 left-0 flex flex-col p-4 gap-5">
            <h2 className="text-2xl font-bold">SpotifyStats</h2>
            <section className="flex flex-col gap-2 w-full">
                <h3 className="font-semibold">Browse</h3>
                <ul className="flex flex-col gap-1 text-neutral-400 w-full">
                    <li className="p-1 cursor-pointer hover:text-white hover:bg-neutral-800 rounded-md">
                        Home
                    </li>
                    <li className="p-1 cursor-pointer hover:text-white hover:bg-neutral-800 rounded-md">
                        Albums
                    </li>
                    <li className="p-1 cursor-pointer hover:text-white hover:bg-neutral-800 rounded-md">
                        Tracks
                    </li>
                </ul>
            </section>
        </nav>
    );
}
