import React from "react";
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
                <img
                    src={track.album?.images[0]?.url}
                    alt=""
                    className="w-16 h-16"
                />
                <div>
                    <h3 className="min-w-[25ch] w-[35ch] truncate text-xs">
                        {track.external_urls.spotify ? (
                            <a
                                href={track.external_urls.spotify}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                {track.name}
                            </a>
                        ) : (
                            track.name
                        )}
                    </h3>

                    <span className="text-xs text-neutral-400 hover:underline hover:underline-offset-1 group-hover:text-white">
                        {track.artists[0].external_urls.spotify ? (
                            <a
                                href={track.artists[0].external_urls.spotify}
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                {track.artists[0].name}
                            </a>
                        ) : (
                            track.artists[0].name
                        )}
                    </span>
                </div>
            </div>

            <span
                className="min-w-[25ch] w-[30ch] truncate text-xs text-neutral-400 hover:underline 
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
            <span className=" text-neutral-400 hidden sm:inline">
                {milliToMinutesAndSeconds(track.duration_ms)}
            </span>
        </div>
    );
}
