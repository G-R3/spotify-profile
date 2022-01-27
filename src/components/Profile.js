import React, { useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import { getUserData } from "../api";
import TopPlaylists from "./TopPlaylists";

export default function User() {
    const [user, setUser] = useState("");
    const [following, setFollowing] = useState("");
    const [topTracks, setTopTracks] = useState("");
    const [topArtists, setTopArtists] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const { user, following, topArtists, topTracks } =
                await getUserData();

            setFollowing(following.artists.total);
            setTopArtists(topArtists);
            setTopTracks(topTracks);
            setUser(user);
        };

        fetchUser();
    }, []);

    return (
        user && (
            <div className="flex flex-col gap-16">
                <section className="flex flex-col items-center gap-2">
                    <img
                        src={user.images[0].url}
                        alt=""
                        className="w-52 h-52 rounded-full"
                    />
                    <h1 className="my-3 text-xl font-semibold">
                        Welcome @{user.display_name}
                    </h1>
                    <div className="flex justify-center items-center gap-3 h-10">
                        <div className="bg-neutral-800 rounded-md py-2 px-5 text-sm text-center">
                            <p className="text-neutral-400 font-semibold">
                                Followers
                            </p>
                            <span className="text-spotify-green block font-bold">
                                {user.followers.total}
                            </span>
                        </div>
                        <div className="bg-neutral-800 rounded-md py-2 px-5 text-sm text-center">
                            <p className="text-neutral-400 font-semibold">
                                Following
                            </p>
                            <span className="text-spotify-green block font-bold">
                                {following}
                            </span>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-14 px-10 lg:mx-auto">
                    <div className="flex flex-col gap-14 xl:flex-row xl:justify-between">
                        <TopArtists artists={topArtists} />
                        <TopTracks tracks={topTracks} />
                    </div>
                    <div>
                        <TopPlaylists />
                    </div>
                </section>
            </div>
        )
    );
}
