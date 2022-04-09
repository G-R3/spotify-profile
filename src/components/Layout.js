import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Sidebar";

export default function Layout({ onLogout }) {
    return (
        <div className="h-full flex flex-col lg:flex-row">
            <NavBar onLogout={onLogout} />
            <main className="flex-grow lg:ml-52">
                <Outlet />
            </main>
        </div>
    );
}
