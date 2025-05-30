import { useEffect, useState } from "react";

const LazyLoad = () => {

    // inmatate load with network delay. 
    const [List, setList] = useState();

    useEffect(() => {

        // Initialize data
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(i);
        }
        setList(arr);

        // Get total document height including the overflow.
        const getTotalHeight = () => {
            return Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight
            );
        };

        const handleScrollToBottom = (event) => {
            let currentHeight = window.innerHeight + window.scrollY;
            let totalHeight = getTotalHeight();

            // Reached the bottom, appending new items.
            if (totalHeight === currentHeight) {
                setList(prevItems => [...prevItems, prevItems[prevItems.length-1] + 1])
            }
        }

        window.addEventListener('scroll', handleScrollToBottom, true);

    }, [])

    return (
        <>
            {List && List.map((n) => {
                return <div>{n}</div>
            })}
        </>
    )
}

export default LazyLoad;