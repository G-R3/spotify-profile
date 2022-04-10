import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { getUserSavedTracks } from "../../api/user";
import Loader from "../Loader";
import TrackItem from "../Playlists/TrackItem";

export default function SavedTracks() {
    const [savedTracks, setSavedTracks] = useState(null);
    useEffect(() => {
        const fetchUserSavedTracks = async () => {
            const tracks = await getUserSavedTracks();
            console.log(tracks);

            setSavedTracks(tracks);
        };

        fetchUserSavedTracks();
    }, []);

    return savedTracks ? (
        <div className="max-w-[1500px] mx-auto">
            <div className="rounded-md py-20 px-10 mb-10 flex flex-col gap-8 md:items-center md:flex-row bg-gradient-to-t from-neutral-800">
                <div className="w-48 h-48 shadow-lg bg-gradient-to-tl from-sky-500 to-indigo-500 flex flex-col items-center justify-center gap-5 hover:shadow-lg">
                    <FaHeart className="text-5xl" />
                </div>
                <div className="flex flex-col gap-5">
                    <span className="uppercase font-semibold text-xs">
                        PLAYLIST
                    </span>

                    <h1 className="text-3xl lg:text-5xl font-bold">
                        Liked Songs
                    </h1>

                    <div className="flex flex-col items-center sm:flex-row gap-5">
                        <div>
                            <Link
                                to={"/"}
                                className="text-sm font-semibold hover:underline hover:underline-offset-1"
                            >
                                OWNER
                            </Link>
                            <span> - {savedTracks.total} songs</span>
                        </div>
                    </div>
                </div>
            </div>

            {savedTracks.items.map((item, idx) => {
                let { track } = item;
                return <TrackItem track={track} index={idx} key={track.id} />;
            })}
        </div>
    ) : (
        <Loader />
    );
}
