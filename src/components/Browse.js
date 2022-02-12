import React, { useEffect, useState } from "react";
import { getFeaturedPlaylists } from "../api";

export default function Browse() {
    const [featuredPlaylists, setFeaturedPlaylists] = useState(null);

    useEffect(() => {
        const getFeatured = async () => {
            const { playlists } = await getFeaturedPlaylists();
            console.log(playlists);
            setFeaturedPlaylists(playlists);
        };

        getFeatured();
    }, []);
    return (
        featuredPlaylists && (
            <div>
                <h1>Featured</h1>
                
            </div>
        )
    );
}
