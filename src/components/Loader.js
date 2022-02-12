import React from "react";

export default function Loader() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center my-8">
            <div className="animate-spin w-6 h-6 border-2" role="status">
                <span className="invisible">Loading...</span>
            </div>
            <h2>Loading...</h2>
        </div>
    );
}
