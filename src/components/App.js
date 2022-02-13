import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Layout from "./Layout";
import token from "../api/index";
import Playlists from "./Playlists";
import PlaylistDetails from "./PlaylistDetails";
import Browse from "./Browse";

function App() {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        setAccessToken(token);
    }, []);

    return (
        <div className="h-full">
            <Routes>
                <Route path="/" element={accessToken ? <Layout /> : <Login />}>
                    <Route index element={<Profile />} />
                    <Route path="/playlists" element={<Playlists />}>
                        <Route
                            path=":playlistId"
                            element={<PlaylistDetails />}
                        />
                    </Route>
                    <Route path="/browse" element={<Browse />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
