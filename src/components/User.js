import React, { useEffect, useState } from "react";
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
            <div>
                <h1>Welcome {user.display_name}</h1>
                <img src={user.images[0].url} alt="" />
                <span>
                    Followers {user.followers.total} | Following
                    {following.total}
                </span>
            </div>
        )
    );
}
