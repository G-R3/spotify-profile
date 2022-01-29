import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    const expand = () => {
        document
            .querySelector(".sidebar")
            .classList.toggle("-translate-x-full");
    };

    return (
        // background color: bg-black
        // li text-color: text-neutral-400    hover: text-white
        // li background-color on hover: bg-neutral-800
        <nav className="bg-black w-full py-4 px-3 md:w-52 fixed transition">
            <div className="flex">
                <span className="px-4 font-bold text-xl">SpotifyStats</span>
                <button onClick={expand} className="ml-auto md:hidden">
                    Expand
                </button>
            </div>
            <ul className="sidebar absolute left-0 bg-black w-52 h-screen -translate-x-full transition-transform py-4 px-3 md:-translate-x-0 md:w-full md:relative md:px-0">
                <li className="hover:bg-neutral-800">
                    <Link to="/" className="py-1 px-4 block text-lg">
                        Profile
                    </Link>
                </li>
                <li className="hover:bg-neutral-800">
                    <Link to="/playlists" className="py-1 px-4 block text-lg">
                        Playlists
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
