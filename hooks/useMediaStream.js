import { useEffect, useRef, useState } from "react"

const useMediaStream = () => {
    const [state, setState] = useState(null)

    const isStreamSet = useRef(false)

    useEffect(() => {
        if(isStreamSet.current) return;
        isStreamSet.current = true
        // (async function initStream() {
            
        //     try {
        //         const stream = await navigator.mediaDevices.getUserMedia({
        //             audio: true, video: true
        //         })
        //         console.log("setting stream state")
        //         setState(stream)
        //     } catch (error) {
        //         console.log(error, "error setting stream state")
        //     }
        // })()
        const initStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                console.log("Setting stream state");
                setState(stream);
            } catch (error) {
                console.error("Error setting stream state", error);
            }
        };

        initStream();

    }, [])

    return {
        stream: state
    }
}


export default useMediaStream