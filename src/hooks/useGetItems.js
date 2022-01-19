import { useState, useEffect } from "react";

export default function useGetItems(getItems) {
    const [items, setItems] = useState("");
    const [nextItems, setNextItems] = useState("");
    const [prevItems, setPrevItems] = useState("");

    useEffect(() => {
        const fetchTracks = async () => {
            const { next, items, previous } = await getItems();

            setItems(items);
            setNextItems(next);
            setPrevItems(previous);
        };

        fetchTracks();
    }, [getItems]);

    const incrementOffset = async () => {
        if (!nextItems) return;
        const { next, items, previous } = await getItems(nextItems);

        setItems(items);
        setNextItems(next);
        setPrevItems(previous);
    };
    const decrementOffset = async () => {
        if (!prevItems) return;
        const { next, items, previous } = await getItems(prevItems);

        setItems(items);
        setNextItems(next);
        setPrevItems(previous);
    };

    return [items, incrementOffset, decrementOffset, nextItems, prevItems];
}
