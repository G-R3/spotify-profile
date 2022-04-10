import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getTopTracks,
    createPlaylist,
    getTrackUris,
    addTracksToPlaylist,
} from "../../api/user";
import Modal from "../Modal";
import TrackItem from "../Playlists/TrackItem";

export default function UserTopTracks({ user }) {
    const [tracks, setTracks] = useState(null);
    const [query, setQuery] = useState("long_term");
    const [showModal, setShowModal] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrack = async () => {
            const tracks = await getTopTracks("long_term");
            setTracks(tracks);
        };

        fetchTrack();
    }, []);

    const handleClick = async (query) => {
        const tracks = await getTopTracks(query);
        setTracks(tracks);
        setQuery(query);
    };

    const createNewPlaylist = async (data) => {
        const { id: playlistId } = await createPlaylist(user, data);
        const uris = getTrackUris(tracks.items);

        await addTracksToPlaylist(playlistId, JSON.stringify({ uris: uris }));
        navigate(`/playlist/${playlistId}`);
    };

    return tracks ? (
        <div>
            <div className="flex flex-col gap-5 md:flex-row items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Your top tracks</h2>
                <div className="flex flex-col gap-5 md:gap-10 md:flex-row text-neutral-400">
                    <button
                        onClick={() => setShowModal(true)}
                        className="border-2 p-2 rounded-md text-white hover:bg-white hover:text-black transition-colors order-2 md:order-1"
                    >
                        Create Playlist
                    </button>
                    {showModal && (
                        <Modal
                            setShowModal={setShowModal}
                            createPlaylist={createNewPlaylist}
                        />
                    )}

                    <div className="flex gap-10 order-1 md:order-2">
                        <button
                            onClick={() => handleClick("long_term")}
                            className={`${
                                query === "long_term" && "text-white"
                            }`}
                        >
                            All Time
                        </button>
                        <button
                            onClick={() => handleClick("medium_term")}
                            className={`${
                                query === "medium_term" && "text-white"
                            }`}
                        >
                            Last 6 Months
                        </button>
                        <button
                            onClick={() => handleClick("short_term")}
                            className={`${
                                query === "short_term" && "text-white"
                            }`}
                        >
                            Last 4 Weeks
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {tracks.items.map((track, i) => (
                    <TrackItem
                        key={track.id ? track.id : i}
                        track={track}
                        index={i}
                    />
                ))}
            </div>
        </div>
    ) : (
        <p className="w-full h-16 text-center">Loading...</p>
    );
}
