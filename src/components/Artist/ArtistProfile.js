import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiUserFollowFill } from "react-icons/ri";
import {
    getArtist,
    getArtistAlbums,
    getArtistTopTrack,
    followArtist,
    unfollowArtist,
} from "../../api/artist";
import { isUserFollowingArtist } from "../../api/user";
import Loader from "../Loader";
import numbersWithCommas from "../../utils/numsWithCommas";
import TrackItem from "../Playlists/TrackItem";
import getImageColor from "../../utils/imageColor";
import AlbumCard from "./AlbumCard";
import Banner from "../Banner";
import Footer from "../Footer";

export default function ArtistProfile() {
    const { artistId } = useParams();
    const [artist, setArtist] = useState("");
    const [topTracks, setTopTracks] = useState("");
    const [following, setIsFollowing] = useState("");
    const [albums, setAlbums] = useState([]);
    const [hideContent, setHideContent] = useState(true);
    const [imageColor, setImageColor] = useState("");

    useEffect(() => {
        const fetchArtist = async () => {
            const artist = await getArtist(artistId);
            const { tracks } = await getArtistTopTrack(artistId);
            const albums = await getArtistAlbums(artistId);
            const isUserFollowing = await isUserFollowingArtist(artistId);
            setArtist(artist);
            setTopTracks(tracks);
            setAlbums(albums.items);
            setIsFollowing(isUserFollowing);
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

    const handleClick = async (artistId) => {
        if (following) {
            await unfollowArtist(artistId);
            setIsFollowing(false);
            return;
        }

        await followArtist(artistId);
        setIsFollowing(true);
        return;
    };

    const subheading = (
        <div className="flex gap-5 items-center">
            <span className="text-white font-semibold">
                {numbersWithCommas(artist.followers.total)} followers
            </span>

            <button
                onClick={() => handleClick(artist.id)}
                className={`flex items-center gap-2 border-2 py-1 px-2 rounded-md text-white hover:bg-white hover:text-black transition-colors`}
            >
                {following ? "Following" : "Follow"} <RiUserFollowFill />
            </button>
        </div>
    );

    return (
        <>
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
                    <div className="grid grid-cols-auto-fit gap-10">
                        {albums.map((album) => (
                            <AlbumCard album={album} key={album.id} />
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
