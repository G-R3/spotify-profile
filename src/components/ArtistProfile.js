import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtist, getArtistTopTrack } from "../api";
import Loader from "./Loader";
import numbersWithCommas from "../utils/numsWithCommas";
import TrackItem from "./TrackItem";

export default function ArtistProfile() {
    const { artistId } = useParams();
    const [artist, setArtist] = useState("");
    const [topTracks, setTopTracks] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            const artist = await getArtist(artistId);
            const { tracks } = await getArtistTopTrack(artistId);
            setArtist(artist);
            setTopTracks(tracks);
            setIsLoading(false);
        };

        fetchArtist();
    }, [artistId]);

    return artist && topTracks && !isLoading ? (
        <div>
            <div className="mb-10 flex flex-col gap-8 md:items-end md:flex-row md:max-h-[200px]">
                <img
                    src={artist.images[0]?.url}
                    alt=""
                    className="w-52 h-52 rounded-full shadow-lg"
                />
                <div className="flex flex-col gap-5">
                    <span className="uppercase font-semibold text-xs">
                        {artist.type}
                    </span>
                    {/* how to scale font-size if goes beyond width of its container */}
                    <h1 className="text-3xl lg:text-5xl font-bold">
                        {artist.name}
                    </h1>

                    <span className="text-neutral-400 font-semibold">
                        {numbersWithCommas(artist.followers.total)} followers
                    </span>
                </div>
            </div>

            <section>
                {topTracks.map((track, i) => (
                    <TrackItem key={track.id} track={track} index={i} />
                ))}
            </section>
        </div>
    ) : (
        <Loader />
    );
}
