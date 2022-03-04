import React, { useEffect, useState } from "react";
import UserTopTracks from "./UserTopTracks";
import UserTopArtists from "./UserTopArtists";
import { getUserData } from "../api";
import Loader from "./Loader";
import { Link } from "react-router-dom";

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

    if (!user || !following || !topTracks || !topArtists) return <Loader />;

    return (
        <div className="py-10 px-5 flex flex-col gap-16 max-w-7xl mx-auto">
            <section className="flex flex-col items-center sm:flex-row sm:items-end gap-8">
                <img
                    src={user.images[0].url}
                    alt=""
                    className="w-52 h-52 rounded-full shadow-lg"
                />
                <div>
                    <span className="font-semibold text-xs">PROFILE</span>
                    <h1 className="my-3 text-6xl lg:text-8xl font-bold">
                        {user.display_name}
                    </h1>

                    <Link
                        to="/"
                        className="text-sm text-spotify-green font-bold"
                    >
                        {following}
                        <span className="text-neutral-400 font-semibold">
                            {" "}
                            Following
                        </span>
                    </Link>
                </div>
            </section>
            <section>
                <UserTopArtists artists={topArtists} />
            </section>
            <section>
                <UserTopTracks tracks={topTracks} />
            </section>
        </div>
    );
}
