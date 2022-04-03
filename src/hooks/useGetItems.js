import { useState } from "react";
import { getItems } from "../api/user";

export default function useGetItems(initialData) {
    const [data, setData] = useState(initialData);

    const getNext = async (url) => {
        if (!url) return;
        const data = await getItems(url);

        setData(data);
    };
    const getPrevious = async (url) => {
        if (!url) return;
        const data = await getItems(url);

        setData(data);
    };

    return { data, getNext, getPrevious };
}
