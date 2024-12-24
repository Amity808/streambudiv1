import { useSocket } from "@/context/socket"
import { useEffect } from "react"
import usePeers from "@/hooks/usePeer"
import useMediaStream from "../hooks/useMediaStream"

const Room = () => {
    const socket = useSocket()
  const { peer, id} = usePeers()
  const { stream } = useMediaStream()

  useEffect(() => {
    socket?.on('connect', () => {
      console.log(socket.id)
    })
  }, [socket])

    return (
        <div>
            <h1>Room</h1>
        </div>
    )
}

export default Room