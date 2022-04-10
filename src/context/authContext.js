import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { token } from "../api/token";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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
        <AuthContext.Provider value={{ token: accessToken, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
