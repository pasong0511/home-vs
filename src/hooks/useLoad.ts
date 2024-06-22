import { useEffect, useState } from "react";

function useLoad(src: string, onLoadCallback?: () => void): boolean {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            setLoaded(true);
            if (onLoadCallback) {
                onLoadCallback();
            }
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [src, onLoadCallback]);

    return loaded;
}

export default useLoad;
