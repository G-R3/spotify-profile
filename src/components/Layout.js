import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Login from "./Login";
// import Footer from "./Footer";

export default function Layout() {
    const { token } = useContext(AuthContext);
    if (!token) {
        return <Login />;
    }

    return (
        <div className="h-full flex flex-col lg:flex-row">
            <Sidebar />
            <main className="flex-grow lg:ml-52">
                <Outlet />
                {/* footer will show up with Loader */}
                {/* <Footer /> */}
            </main>
        </div>
    );
}
