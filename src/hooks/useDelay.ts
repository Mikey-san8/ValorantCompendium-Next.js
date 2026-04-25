import { useEffect, useState } from "react";

export function useDelay(ms: number, deps: any[] = []) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let isMounted = true;
        setReady(false);

        const timer = setTimeout(() => {
            if (isMounted) setReady(true);
        }, ms);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, deps);

    return ready;
}