import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtist, getArtistAlbums, getArtistTopTrack } from "../../api";
import Loader from "../Loader";
import numbersWithCommas from "../../utils/numsWithCommas";
import TrackItem from "../TrackItem";
import getImageColor from "../../utils/imageColor";
import AlbumCard from "./AlbumCard";

export default function ArtistProfile() {
    const { artistId } = useParams();
    const [artist, setArtist] = useState("");
    const [topTracks, setTopTracks] = useState("");
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hideContent, setHideContent] = useState(true);
    const [imageColor, setImageColor] = useState("");

    useEffect(() => {
        const fetchArtist = async () => {
            const artist = await getArtist(artistId);
            const { tracks } = await getArtistTopTrack(artistId);
            const albums = await getArtistAlbums(artistId);
            setArtist(artist);
            setTopTracks(tracks);
            setAlbums(albums);
            setIsLoading(false);
        };

        fetchArtist();
    }, [artistId]);

    useEffect(() => {
        if (!artist) {
            return;
        }
        const getColor = async () => {
            let color = await getImageColor(artist.images[0]?.url);
            setImageColor(color);
        };

        getColor();
    }, [artist]);

    return artist && topTracks && albums && !isLoading ? (
        <div className="flex flex-col gap-10">
            <div
                style={{
                    backgroundColor: imageColor,
                }}
                className="rounded-md py-20 px-10 flex flex-col gap-8 md:items-end md:flex-row bg-gradient-to-t from-neutral-800"
            >
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

            <section className="px-5">
                <h2 className="text-2xl font-bold mb-5">Popular</h2>
                <div>
                    {hideContent
                        ? topTracks
                              .slice(0, 5)
                              .map((track, i) => (
                                  <TrackItem
                                      key={track.id}
                                      track={track}
                                      index={i}
                                  />
                              ))
                        : topTracks.map((track, i) => (
                              <TrackItem
                                  key={track.id}
                                  track={track}
                                  index={i}
                              />
                          ))}
                </div>
                <button
                    className="text-neutral-400 text-sm font-semibold"
                    onClick={() => setHideContent(!hideContent)}
                >
                    {hideContent ? "SEE MORE" : "SEE LESS"}
                </button>
            </section>

            <section className="px-5">
                <h2 className="text-2xl font-bold mb-5">Albums</h2>
                <div className="grid grid-cols-auto-fit gap-10 pb-10">
                    {albums.items.map((album) => (
                        <AlbumCard album={album} key={album.id} />
                    ))}
                </div>
            </section>
        </div>
    ) : (
        <Loader />
    );
}
