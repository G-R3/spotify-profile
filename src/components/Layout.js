import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Sidebar";

export default function Layout() {
    return (
        <>
            <NavBar />
            <main className="lg:ml-52 py-10">
                <Outlet />
            </main>
        </>
    );
}
