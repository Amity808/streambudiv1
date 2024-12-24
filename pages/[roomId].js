import { useSocket } from "@/context/socket"
import { useEffect } from "react"
import usePeers from "@/hooks/usePeer"
import useMediaStream from "../hooks/useMediaStream"
import Player from "../components/player"
const Room = () => {
    const socket = useSocket()
  const { peer, myId} = usePeers()
  const { stream } = useMediaStream()

  console.log(peer)

  useEffect(() => {
    if(!socket || !peer || !stream) return;
    
    const handleuserConnections = (newUser) => {
        console.log(newUser, "new user connected")
        const call = peer.call(newUser, stream)

        call.on('stream', (incomingStream) => {
            console.log("incoming stream from" + newUser)
        })
    }
    socket.on("user-connected", handleuserConnections)
    
    
    return () => {
        socket.off("user-connected", handleuserConnections)
    }
  }, [peer, socket, stream])

  useEffect(() => {
    if(!peer || !stream) return;
    peer.on('call', (call) => {
        const { peer: caller} = call;
        call.answer(stream)

        call.on('stream', (incomingStream) => {
            console.log("incoming stream from" + caller)
        })
    })
  },[peer, stream])

    return (
        <div>
            <h1>Room</h1>

            <div>
                <Player  url={stream} muted playing playerId={myId}/>
            </div>
        </div>
    )
}

export default Room