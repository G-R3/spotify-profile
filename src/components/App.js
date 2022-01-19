import { useState, useEffect } from "react";
import Login from "./Login";
import Profile from "./Profile";
import token from "../api/index";

function App() {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        setAccessToken(token);
    }, []);

    return (
        <div className="h-full">{accessToken ? <Profile /> : <Login />}</div>
    );
}

export default App;
