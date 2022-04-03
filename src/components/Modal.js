import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
export default function Modal({ setShowModal, createPlaylist }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setName(e.target.value);
        setError(false);
    };

    const handleSubmit = () => {
        if (!name) {
            setError(true);
            return;
        }
        const data = { name, public: false, description };

        createPlaylist(data);
        setShowModal(false);
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-xs">
                    {/*content*/}
                    <div className="p-6 shadow-lg relative flex flex-col gap-5 w-full bg-neutral-800 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between ">
                            <h3 className="text-3xl font-semibold">
                                Create Playlist
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        {/*body*/}
                        {error && (
                            <div className="bg-red-500 text-white flex items-center p-2 gap-2 rounded-md">
                                <BiErrorCircle size={22} />
                                <p>Playlist name is required</p>
                            </div>
                        )}
                        <div className="flex flex-col gap-3">
                            <input
                                value={name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Add a name"
                                autoComplete="false"
                                onChange={(e) => handleChange(e)}
                                className="bg-neutral-700 px-3 py-2 rounded-md"
                            />
                            <textarea
                                value={description}
                                name="description"
                                id="description"
                                placeholder="Add description (optional)"
                                rows="5"
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-neutral-700 px-3 py-2 rounded-md"
                            ></textarea>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b pt-2">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-white text-black active:text-white active:bg-spotify-green font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}
