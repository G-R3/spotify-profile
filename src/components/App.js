import axios from "axios";
import { useState, useEffect } from "react";

function App() {
    const [token, setToken] = useState("");

    function getJsonFromUrl(url) {
        if (!url) url = window.location.search;
        var query = url.substr(1);
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }

    useEffect(() => {
        setToken(token);
    }, []);

    return (
        <div className="App">
            <a href="http://localhost:3001/login">Login</a>
        </div>
    );
}

export default App;
