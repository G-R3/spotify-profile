import React from "react";
import { Link } from "react-router-dom";
import { milliToMinutesAndSeconds } from "../../utils/utils";

export default function TrackItem({ track, index }) {
    return (
        <div className="py-3 px-5 grid sm:grid-cols-4 md:grid-cols-8 items-center gap-4 text-sm hover:bg-neutral-800 rounded-md group w-full">
            <div className="flex items-center sm:col-span-3 md:col-span-5 gap-5">
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
                        className="w-14 h-14"
                    />
                )}
                <div>
                    <h3 className="text-xs md:text-sm">
                        {track.external_urls.spotify ? (
                            <a
                                href={track.external_urls.spotify}
                                target={"_blank"}
                                rel="noreferrer"
                                className="one-line-ellipsis font-semibold"
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
                <span className="hidden text-xs text-neutral-400 hover:underline hover:text-white hover:underline-offset-1 sm:flex sm:col-span-1 md:col-span-2">
                    <Link
                        to={`/album/${track.album.id}`}
                        className="one-line-ellipsis"
                    >
                        {track.album.name}
                    </Link>
                </span>
            )}
            <span
                className={`${
                    track.album ? "md:col-span-1" : "md:col-span-3"
                } hidden justify-end text-neutral-400 md:flex`}
            >
                {milliToMinutesAndSeconds(track.duration_ms)}
            </span>
        </div>
    );
}
