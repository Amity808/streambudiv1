import { useEffect, useRef, useState } from "react"
import {useSocket } from "../context/socket"
import { useRouter } from "next/router"
 const usePeer = () => {
    const socket = useSocket()
    const [peer, setPeer] = useState(null)
    const [myId, setMyId] = useState('')
    const roomId = useRouter().query.roomId;
    const isPeerSet = useRef(false)

    useEffect(() => {
        if(isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true;
        let mypeer
        (async function initPeer(){
            mypeer = new (await import('peerjs')).default();
            setPeer(mypeer);

            mypeer.on('open', (id) => {
                console.log('your peer id is', id);
                setMyId(id);
                socket?.emit("join-room", roomId, id)
            })
        })()
    }, [roomId, socket])

    return {
        peer,
        myId
    }
 }

 export default usePeer;