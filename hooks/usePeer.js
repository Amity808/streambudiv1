import { useEffect, useRef, useState } from "react"
 const usePeer = () => {
    const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')
    const isPeerSet = useRef(false)

    useEffect(() => {
        if(isPeerSet.current) return;
        isPeerSet.current = true;
        (async function initPeer(){
            const mypeer = new (await import('peerjs')).default();
            setPeer(mypeer);

            mypeer.on('open', (id) => {
                console.log('your peer id is', id);
                setMyId(id);
            })
        })()
    }, [])

    return {
        peer,
        myId
    }
 }

 export default usePeer;