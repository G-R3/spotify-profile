import React, { useEffect, useState } from "react";
import UserTopTracks from "./UserTopTracks";
import UserTopArtists from "./UserTopArtists";
import { getUserData } from "../api";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import getImageColor from "../utils/imageColor";

export default function User() {
    const [user, setUser] = useState("");
    const [following, setFollowing] = useState("");
    const [topTracks, setTopTracks] = useState("");
    const [topArtists, setTopArtists] = useState("");
    const [imageColor, setImageColor] = useState("");

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

    useEffect(() => {
        if (!user) {
            return;
        }
        const getColor = async () => {
            let color = await getImageColor(user.images[0].url);
            setImageColor(color);
        };

        getColor();
    }, [user]);

    if (!user || !following || !topTracks || !topArtists) return <Loader />;

    return (
        <div className="py-10 px-5 flex flex-col gap-16 max-w-7xl mx-auto">
            <section
                style={{
                    backgroundColor: imageColor,
                }}
                className="rounded-md py-20 px-10 flex flex-col items-center sm:flex-row sm:items-end gap-8 bg-gradient-to-t from-neutral-800"
            >
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
