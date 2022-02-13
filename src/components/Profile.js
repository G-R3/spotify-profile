import React, { useEffect, useState } from "react";
import UserTopTracks from "./UserTopTracks";
import UserTopArtists from "./UserTopArtists";
import { getUserData } from "../api";
import UserPlaylists from "./UserPlaylists";
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
        <div className="flex flex-col gap-16">
            <section className="flex items-end gap-5">
                <img
                    src={user.images[0].url}
                    alt=""
                    className="w-52 h-52 rounded-full"
                />
                <div className="">
                    <span className="font-semibold text-xs">PROFILE</span>
                    <h1 className="my-3 text-3xl lg:text-8xl font-bold">
                        {user.display_name}
                    </h1>

                    <Link to="/" className="text-sm">
                        <p className="text-spotify-green font-bold">
                            {following}
                            <span className="text-neutral-400 font-semibold">
                                {" "}
                                Following
                            </span>
                        </p>
                    </Link>
                </div>
            </section>
            <section>
                <UserTopArtists artists={topArtists} />
            </section>
            <section>
                <UserTopTracks tracks={topTracks} />
            </section>
            {/* <section className="flex flex-col gap-14 px-10 lg:mx-auto max-w-7xl">
                <div className="flex flex-col gap-14 xl:flex-row xl:justify-between">
                    <TopArtists artists={topArtists} />
                    <TopTracks tracks={topTracks} />
                </div>
                <div>
                    <UserPlaylists />
                </div>
            </section> */}
        </div>
    );
}
