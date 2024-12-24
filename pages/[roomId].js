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
    socket?.on('connect', () => {
      console.log(socket.id)
    })
  }, [socket])

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