import React from "react";

export default function Loader() {
    return (
        <div className="flex flex-col gap-5 justify-center items-center">
            <div className="animate-spin w-8 h-8 border-2" role="status">
                <span className="invisible">Loading...</span>
            </div>
            <h2>Loading...</h2>
        </div>
    );
}
