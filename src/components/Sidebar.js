import React from "react";
import { Link } from "react-router-dom";
import { BiLibrary, BiHomeAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

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
        <nav className="bg-black px-2 py-4 lg:w-52 sticky lg:fixed top-0 left-0 transition shadow-lg">
            <div className="flex justify-between">
                <span className="font-bold text-xl md:text-3xl">
                    SpotifyStats
                </span>
                <button onClick={expand} className="lg:hidden">
                    Expand
                </button>
            </div>
            <ul className="sidebar text-lg absolute left-0 bg-black w-52 h-screen -translate-x-full transition-transform py-4 px-3 lg:-translate-x-0 lg:w-full lg:relative lg:px-0">
                <li className="rounded-md hover:bg-neutral-800">
                    <Link
                        to="/profile"
                        className="p-2 font-semibold flex items-center gap-2"
                    >
                        <BiHomeAlt />
                        Profile
                    </Link>
                </li>
                <li className="rounded-md hover:bg-neutral-800">
                    <Link
                        to="/library"
                        className="p-2 font-semibold flex items-center gap-2"
                    >
                        <BiLibrary />
                        Library
                    </Link>
                </li>
                <li className="rounded-md hover:bg-neutral-800">
                    <Link
                        to="/browse"
                        className="p-2 font-semibold flex items-center gap-2"
                    >
                        <AiOutlineSearch />
                        Browse
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
