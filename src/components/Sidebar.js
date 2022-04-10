import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { BiLibrary, BiHomeAlt, BiLogOut } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";

export default function Sidebar() {
    const { handleLogout } = useContext(AuthContext);

    const expand = () => {
        document
            .querySelector(".sidebar")
            .classList.toggle("-translate-x-full");
    };

    const handleClick = () => {
        document
            .querySelector(".sidebar")
            .classList.toggle("-translate-x-full");
    };

    return (
        <nav className="bg-black px-5 py-4 lg:w-52 sticky lg:fixed top-0 left-0 transition shadow-lg z-10">
            <div className="flex justify-between">
                <span className="font-bold text-xl md:text-3xl">
                    SpotifyStats
                </span>
                <button onClick={expand} className="lg:hidden">
                    <AiOutlineMenu size={20} />
                </button>
            </div>
            <ul className="sidebar text-lg absolute left-0 bg-black w-52 h-screen -translate-x-full transition-transform py-4 px-3 lg:-translate-x-0 lg:w-full lg:relative lg:px-0">
                <li className="rounded-md hover:bg-neutral-800">
                    <Link
                        to="/"
                        onClick={handleClick}
                        className="p-2 font-semibold flex items-center gap-2"
                    >
                        <BiHomeAlt />
                        Home
                    </Link>
                </li>
                <li className="rounded-md hover:bg-neutral-800">
                    <Link
                        to="/library"
                        onClick={handleClick}
                        className="p-2 font-semibold flex items-center gap-2"
                    >
                        <BiLibrary />
                        Library
                    </Link>
                </li>
                <li className="rounded-md hover:bg-neutral-800">
                    <button
                        onClick={handleLogout}
                        className="p-2 font-semibold flex items-center gap-2 w-full"
                    >
                        <BiLogOut />
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}
