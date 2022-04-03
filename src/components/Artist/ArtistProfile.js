import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getArtist,
    getArtistAlbums,
    getArtistTopTrack,
} from "../../api/artist";
import Loader from "../Loader";
import numbersWithCommas from "../../utils/numsWithCommas";
import TrackItem from "../Playlists/TrackItem";
import getImageColor from "../../utils/imageColor";
import AlbumCard from "./AlbumCard";
import Banner from "../Banner";

export default function ArtistProfile() {
    const { artistId } = useParams();
    const [artist, setArtist] = useState("");
    const [topTracks, setTopTracks] = useState("");
    const [albums, setAlbums] = useState([]);
    const [hideContent, setHideContent] = useState(true);
    const [imageColor, setImageColor] = useState("");

    useEffect(() => {
        const fetchArtist = async () => {
            const artist = await getArtist(artistId);
            const { tracks } = await getArtistTopTrack(artistId);
            const albums = await getArtistAlbums(artistId);
            setArtist(artist);
            setTopTracks(tracks);
            setAlbums(albums.items);
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

    if (!artist || !topTracks || !albums) return <Loader />;

    const subheading = (
        <span className="text-neutral-400 font-semibold">
            {numbersWithCommas(artist.followers.total)} followers
        </span>
    );

    return (
        <div className="flex flex-col gap-10">
            <Banner
                backgroundColor={imageColor}
                images={artist.images}
                type={artist.type}
                name={artist.name}
                subheading={subheading}
            />

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
                    {albums.map((album) => (
                        <AlbumCard album={album} key={album.id} />
                    ))}
                </div>
            </section>
        </div>
    );
}
