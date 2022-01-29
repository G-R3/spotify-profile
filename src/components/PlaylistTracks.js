import React from "react";
import { milliToMinutesAndSeconds } from "../utils/utils";

export default function PlaylistTracks({ track, index }) {
    return (
        <div className="md:h-16 p-3 flex items-center justify-between gap-4 text-sm hover:bg-neutral-800 rounded-md group w-full">
            <div className="flex gap-5 items-center">
                <span className="text-neutral-400 font-semibold text-xs">
                    {index + 1}
                </span>
                <img
                    src={track.track.album.images[0]?.url}
                    alt=""
                    className="w-10 h-10"
                />
                <div>
                    <h3 className="min-w-[25ch] w-[35ch] truncate text-xs">
                        {track.track.external_urls.spotify ? (
                            <a
                                href={track.track.external_urls.spotify}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                {track.track.name}
                            </a>
                        ) : (
                            track.track.name
                        )}
                    </h3>

                    <span className="text-xs text-neutral-400 hover:underline hover:underline-offset-1 group-hover:text-white">
                        {track.track.artists[0].external_urls.spotify ? (
                            <a
                                href={
                                    track.track.artists[0].external_urls.spotify
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                {track.track.artists[0].name}
                            </a>
                        ) : (
                            track.track.artists[0].name
                        )}
                    </span>
                </div>
            </div>

            <span
                className="min-w-[25ch] w-[30ch] truncate text-xs text-neutral-400 hover:underline 
  hover:text-white hover:underline-offset-1 hidden sm:inline"
            >
                <a
                    href={track.track.album.external_urls.spotify}
                    target={"_blank"}
                    rel="noreferrer"
                >
                    {track.track.album.name}
                </a>
            </span>
            <span className=" text-neutral-400 hidden sm:inline">
                {milliToMinutesAndSeconds(track.track.duration_ms)}
            </span>
        </div>
    );
}
