import { useState, useEffect } from "react";
import Login from "./Login";
import User from "./User";
import token from "../api/index";

function App() {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        setAccessToken(token);
    }, []);

    return <div>{accessToken ? <User /> : <Login />}</div>;
}

export default App;
