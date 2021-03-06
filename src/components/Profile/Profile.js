import React, { useEffect, useState } from "react";
import UserTopTracks from "./UserTopTracks";
import UserTopArtists from "./UserTopArtists";
import { getUserData } from "../../api/user";
import Loader from "../Loader";
import getImageColor from "../../utils/imageColor";
import Banner from "../Banner";
import Footer from "../Footer";

export default function User() {
    const [user, setUser] = useState("");
    const [following, setFollowing] = useState("");
    const [topArtists, setTopArtists] = useState("");
    const [imageColor, setImageColor] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const { user, following, topArtists } = await getUserData();
            setFollowing(following.artists.total);
            setTopArtists(topArtists);
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

    if (!user || !following || !topArtists) return <Loader />;

    const subheading = (
        <div>
            <p className="text-sm text-spotify-green font-bold">
                {following}
                <span className="text-neutral-400 font-semibold">
                    {" "}
                    Following
                </span>
            </p>
        </div>
    );

    return (
        <>
            <div className="pt-10 px-5 flex flex-col gap-16 max-w-7xl mx-auto">
                <Banner
                    backgroundColor={imageColor}
                    images={user.images}
                    type={"PROFILE"}
                    name={user.display_name}
                    subheading={subheading}
                />

                <section>
                    <UserTopArtists artists={topArtists} />
                </section>
                <section>
                    <UserTopTracks user={user.id} />
                </section>
            </div>
            <Footer />
        </>
    );
}
