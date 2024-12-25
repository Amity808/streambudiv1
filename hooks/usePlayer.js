import { cloneDeep } from "lodash"
import { useState } from "react"
import { useSocket } from "../context/socket"
import { useRouter } from "next/navigation"
const usePlayer = (myId, roomId, peer) => {
    const socket = useSocket()
    const [players, setPlayers] = useState({})
    const router = useRouter()
    const playerCopy = cloneDeep(players)

    const playerHightlighted = playerCopy[myId]

    delete playerCopy[myId]

    const nonHighlightedPlayers = playerCopy

    const leaveRoom = () => {
        socket.emit("user-leave", myId, roomId)
        console.log("leaving room" + roomId)
        peer?.disconnect()
        router.push("/")
    }

    const toggleAudio = () => {
        console.log("i toogle my audio")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].muted = !copy[myId].muted
            return {...copy}
        })
        socket.emit("user-toggle-audio", myId, roomId)
    }

    const toggleVideo = () => {
        console.log("I toggle my video")
        setPlayers((prev) => {
            const copy = cloneDeep(prev)
            copy[myId].playing = !copy[myId].playing
            return {...copy}
        })
        socket.emit("user-toggle-video", myId, roomId)
    }
    
    


    return { players, setPlayers, playerHightlighted, nonHighlightedPlayers, toggleAudio, toggleVideo, leaveRoom }

}

export default usePlayer