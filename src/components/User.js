import React, { useEffect, useState } from "react";
import NavBar from "./Sidebar";
import Tracks from "./Tracks";
import Artists from "./Artists";
import { getUser, getFollowing } from "../api";
import Playlists from "./Playlists";

export default function User() {
    const [user, setUser] = useState("");
    const [following, setFollowing] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            const followingData = await getFollowing();

            setUser(data);
            setFollowing(followingData);
        };

        fetchUser();
    }, []);
    return (
        user && (
            <div>
                <NavBar />
                <main className="ml-52 py-10 ">
                    <div className="flex flex-col gap-16">
                        <section className="flex flex-col items-center gap-2">
                            <img
                                src={user.images[0].url}
                                alt=""
                                className="w-52 h-52 rounded-full"
                            />
                            <h1 className="my-3 font-semibold">
                                Welcome @{user.display_name}
                            </h1>
                            <div className="flex justify-center items-center gap-3 h-10">
                                <div className="bg-neutral-800 rounded-md py-1 px-4">
                                    <p className="text-neutral-400 text-sm font-semibold">
                                        Followers
                                    </p>
                                    <span className="text-spotify-green text-center block font-bold">
                                        {user.followers.total}
                                    </span>
                                </div>
                                <div className="bg-neutral-800 rounded-md py-1 px-4">
                                    <p className="text-neutral-400 text-sm font-semibold">
                                        Following
                                    </p>
                                    <span className="text-spotify-green text-center block font-bold">
                                        {following.total}
                                    </span>
                                </div>
                            </div>
                        </section>
                        <section className="flex justify-evenly flex-col md:flex-row">
                            <Artists />
                            <Tracks />
                        </section>
                        <section className="flex flex-col gap-20">
                            <div className="p-10">
                                <Playlists />
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        )
    );
}
