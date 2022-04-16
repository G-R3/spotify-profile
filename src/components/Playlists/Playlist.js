import React from "react";
import Banner from "../Banner";
import TrackItem from "./TrackItem";
import Footer from "../Footer";

export default function Playlist({ playlist, subheading, imageColor }) {
    const { images, type, name, description, external_urls, tracks } = playlist;
    return (
        <>
            <Banner
                backgroundColor={imageColor}
                images={images}
                type={type}
                name={name}
                description={description}
                external_urls={external_urls}
                subheading={subheading}
                isPublic={playlist.public}
            />
            <div className="flex flex-col w-full px-5">
                {tracks.items.map((item, i) => {
                    const track = item.track ? item.track : item;

                    return (
                        <TrackItem
                            key={track.id ? track.id : i}
                            track={track}
                            index={i}
                        />
                    );
                })}
            </div>
            <Footer />
        </>
    );
}
