import React from "react";
import { Link } from "react-router-dom";
import { milliToMinutesAndSeconds } from "../utils/utils";

export default function TrackItem({ track, index }) {
    return (
        <div className="py-3 px-5 flex items-center justify-between gap-4 text-sm hover:bg-neutral-800 rounded-md group w-full">
            <div className="flex gap-5 items-center">
                {index || index === 0 ? (
                    <span className="text-neutral-400 font-semibold text-xs">
                        {index + 1}
                    </span>
                ) : (
                    ""
                )}
                {track.album && (
                    <img
                        src={track.album?.images[0]?.url}
                        alt=""
                        className="w-16 h-16"
                    />
                )}
                <div>
                    <h3 className="w-[20ch] sm:w-[35ch] text-xs truncate md:text-sm">
                        {track.external_urls.spotify ? (
                            <a
                                href={track.external_urls.spotify}
                                target={"_blank"}
                                rel="noreferrer"
                                className="font-semibold"
                            >
                                {track.name}
                            </a>
                        ) : (
                            track.name
                        )}
                    </h3>

                    <span className="text-xs text-neutral-400 md:text-sm hover:underline hover:underline-offset-1 group-hover:text-white">
                        {track.artists[0].external_urls.spotify ? (
                            <Link to={`/artist/${track.artists[0]?.id}`}>
                                {track.artists[0].name}
                            </Link>
                        ) : (
                            track.artists[0].name
                        )}
                    </span>
                </div>
            </div>

            {track.album && (
                <span
                    className="w-[30ch] truncate text-xs text-neutral-400 hover:underline 
  hover:text-white hover:underline-offset-1 hidden sm:inline"
                >
                    <a
                        href={track.album.external_urls.spotify}
                        target={"_blank"}
                        rel="noreferrer"
                    >
                        {track.album.name}
                    </a>
                </span>
            )}
            <span className=" text-neutral-400 hidden sm:inline">
                {milliToMinutesAndSeconds(track.duration_ms)}
            </span>
        </div>
    );
}
