import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Sidebar";

export default function Layout() {
    return (
        <div className="flex flex-col lg:flex-row">
            <NavBar />
            <main className="flex-grow lg:ml-52">
                <Outlet />
            </main>
        </div>
    );
}
