import React from "react";

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-8">
            <h1 className="text-5xl font-bold text-center">Spotify Profile</h1>
            <a
                href="http://localhost:3001/login"
                className="bg-spotify-green text-white p-5 text-lg tracking-wide font-semibold rounded-full hover:-translate-y-1 transition-transform"
            >
                Login with Spotify
            </a>
        </div>
    );
}
