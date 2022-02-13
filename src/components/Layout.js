import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Sidebar";

export default function Layout() {
    return (
        <div className="min-h-screen">
            <NavBar />
            <main className="pb-10 pt-20 px-5 lg:ml-52">
                <Outlet />
            </main>
        </div>
    );
}
