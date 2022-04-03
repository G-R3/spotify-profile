import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile/Profile";
import Layout from "./Layout";
import { token } from "../api/token";
import Library from "./Library";
import PlaylistDetails from "./Playlists/PlaylistDetails";
import Browse from "./Browse";
import ArtistProfile from "./Artist/ArtistProfile";
import SavedTracks from "./Profile/SavedTracks";

function App() {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        setAccessToken(token);
    }, []);

    return (
        <div className="h-full">
            <Routes>
                <Route path="/" element={accessToken ? <Layout /> : <Login />}>
                    <Route index path="/profile" element={<Profile />} />
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
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/saved" element={<SavedTracks />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
