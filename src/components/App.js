import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import Profile from "./Profile/Profile";
import Layout from "./Layout";
import Library from "./Library";
import PlaylistDetails from "./Playlists/PlaylistDetails";
import ArtistProfile from "./Artist/ArtistProfile";
import SavedTracks from "./Profile/SavedTracks";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Profile />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/playlist">
                        <Route
                            path=":playlistId"
                            element={<PlaylistDetails />}
                        />
                    </Route>
                    <Route path="/artist">
                        <Route path=":artistId" element={<ArtistProfile />} />
                    </Route>
                    <Route path="/album">
                        <Route path=":albumId" element={<PlaylistDetails />} />
                    </Route>
                    <Route path="/saved" element={<SavedTracks />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
