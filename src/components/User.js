import React, { useEffect, useState } from "react";
import { getUser } from "../api";

export default function User() {
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getUser();
            setUser(data);
        };

        // fetchUser();
    }, [user]);
    return (
        <div>
            <h1>Welcome {user.display_name}</h1>
            <img src="" alt="" />
        </div>
    );
}
