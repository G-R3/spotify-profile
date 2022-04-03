import React from "react";

export default function Banner({
    backgroundColor,
    images,
    type,
    name,
    description,
    external_urls,
    subheading = null,
}) {
    return (
        <>
            <section
                style={{
                    backgroundColor: backgroundColor,
                }}
                className="rounded-md py-20 px-10 mb-10 flex flex-col gap-8 md:items-center md:flex-row bg-gradient-to-t from-neutral-800"
            >
                <img
                    src={images[0]?.url}
                    alt=""
                    className={`w-48 h-48 shadow-lg ${
                        type === "PROFILE" || type === "ARTIST"
                            ? "rounded-full"
                            : ""
                    }`}
                />
                <div className="flex flex-col gap-5">
                    <span className="uppercase font-semibold text-xs">
                        {type}
                    </span>
                    {/* how to scale font-size if goes beyond width of its container */}
                    <h1 className="text-3xl lg:text-5xl font-bold">{name}</h1>
                    {description && (
                        <p className="text-neutral-400">{description}</p>
                    )}
                    <div className="flex flex-col items-center sm:flex-row gap-5">
                        {subheading}

                        {external_urls && (
                            <a
                                href={external_urls.spotify}
                                target={"_blank"}
                                className="text-center bg-spotify-green p-2 rounded-full text-sm active:ring-2 active:ring-offset-2 active:ring-offset-black hover:ring-2 hover:ring-offset-2 hover:ring-offset-black transition-all"
                                rel="noreferrer"
                            >
                                View on Spotify
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
