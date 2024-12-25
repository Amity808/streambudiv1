import { useSocket } from "@/context/socket"
import { useEffect } from "react"
import usePeers from "@/hooks/usePeer"
import useMediaStream from "../hooks/useMediaStream"
import Player from "../components/player"
import usePlayer from "../hooks/usePlayer"
import styles from "../styles/room.module.css"
const Room = () => {
    const socket = useSocket()
  const { peer, myId} = usePeers()
  const { stream } = useMediaStream()
  const { players, setPlayers, playerHightlighted, nonHighlightedPlayers } = usePlayer(myId)

  console.log(peer)

  useEffect(() => {
    if(!socket || !peer || !stream) return;
    
    const handleuserConnections = (newUser) => {
        console.log(newUser, "new user connected")
        const call = peer.call(newUser, stream)

        call.on('stream', (incomingStream) => {
            console.log("incoming stream from" + newUser)
            setPlayers((prev) => ({
                ...prev,
                [newUser]: {
                    url: incomingStream,
                    muted: true,
                    playing: true
                }
            }))
        })
    }
    socket.on("user-connected", handleuserConnections)
    
    
    return () => {
        socket.off("user-connected", handleuserConnections)
    }
  }, [peer, setPlayers, socket, stream])

  useEffect(() => {
    if(!peer || !stream) return;
    peer.on('call', (call) => {
        const { peer: callerId} = call;
        call.answer(stream)

        call.on('stream', (incomingStream) => {
            console.log("incoming stream from" + callerId + ":" + incomingStream)
            setPlayers((prev) => ({
                ...prev,
                [callerId]: {
                    url: incomingStream,
                    muted: true,
                    playing: true
                }
            }))
        })
    })
  },[peer, setPlayers, stream])

  useEffect(() => {
    if(!stream || !myId) return;
    console.log("setting my stream " + myId)
    setPlayers((prev) => ({
        ...prev,
        [myId]: {
            url: stream,
            muted: false,
            playing: true
        }
    }))
  }, [myId, setPlayers, stream])

  console.log(players)

    return (
        <div>
            <h1>Room</h1>
            <div>
                <div className={styles.activePlayerContainer}>
                    {playerHightlighted && (
                                                    <Player url={playerHightlighted?.url} muted={playerHightlighted?.muted} playing={playerHightlighted?.playing} isActive={true} />

                    )}
                </div>
                <div className={styles.inActivePlayerContainer}>
                {
                    Object.keys(nonHighlightedPlayers).map((playerId) => {
                        const { url, muted, playing} = nonHighlightedPlayers[playerId]
                        return (
                            <Player key={playerId} url={url} muted={muted} playing={playing} isActive={false}/>
                        )
                    })
                }
                </div>
                
            </div>

           
        </div>
    )
}

export default Room