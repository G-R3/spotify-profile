import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile/Profile";
import Layout from "./Layout";
import { token } from "../api/token";
import Library from "./Library";
import PlaylistDetails from "./Playlists/PlaylistDetails";
import ArtistProfile from "./Artist/ArtistProfile";
import SavedTracks from "./Profile/SavedTracks";

function App() {
    const [accessToken, setAccessToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setAccessToken(token);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setAccessToken(null);
        navigate("/", { replace: true });
    };

    return (
        <div className="h-full">
            <Routes>
                <Route
                    path="/"
                    element={
                        accessToken ? (
                            <Layout onLogout={handleLogout} />
                        ) : (
                            <Login />
                        )
                    }
                >
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
        </div>
    );
}

export default App;
