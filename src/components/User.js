import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { getUser, getFollowing } from "../api";

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
            <div className="">
                <NavBar />
                <div className="ml-52 py-10 flex flex-col items-center">
                    <img
                        src={user.images[0].url}
                        alt=""
                        className="w-52 h-52 rounded-full"
                    />
                    <h1>Welcome {user.display_name}</h1>
                    <span>
                        Followers {user.followers.total} | Following
                        {following.total}
                    </span>
                </div>
            </div>
        )
    );
}
