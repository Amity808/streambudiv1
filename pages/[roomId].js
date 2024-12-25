import { useSocket } from "@/context/socket";
import { useEffect, useState } from "react";
import usePeers from "@/hooks/usePeer";
import useMediaStream from "../hooks/useMediaStream";
import Player from "../components/player";
import usePlayer from "../hooks/usePlayer";
import styles from "../styles/room.module.css";
import { useRouter } from "next/router";
import Botton from "../components/Botton";
import { cloneDeep } from "lodash";
import CopySection from "../components/CopySection";
const Room = () => {
  const socket = useSocket();
  const { roomId } = useRouter().query;
  const { peer, myId } = usePeers();
  const { stream } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHightlighted,
    nonHighlightedPlayers,
    toggleVideo,
    toggleAudio, leaveRoom
  } = usePlayer(myId, roomId, peer);
  const [users, setUsers] = useState([])

  console.log(peer);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleuserConnections = (newUser) => {
      console.log(newUser, "new user connected");
      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log("incoming stream from" + newUser);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
        setUsers((prev) => ({
            ...prev,
            [newUser]: call
        }))
      });
    };
    socket.on("user-connected", handleuserConnections);

    return () => {
      socket.off("user-connected", handleuserConnections);
    };
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log("user with the id toggle audio" + userId);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log("user with the id toggle audio" + userId);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };
    const handleUserLeave = (userId) => {
        console.log("user with the id is leaveing the room " + userId)
        users[userId]?.close();
        const playerCopy = cloneDeep(players)
        delete playerCopy[userId];
        setPlayers(playerCopy)
    }
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleAudio);
      socket.off("user-leave", handleUserLeave);

    };
  }, [setPlayers, socket, users, players]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log("incoming stream from" + callerId + ":" + incomingStream);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev) => ({
            ...prev,
            [callerId]: call
        }))
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log("setting my stream " + myId);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: false,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);

  console.log(players);

  return (
    <div>
      <h1>Room</h1>
      <div>
        <div className={styles.activePlayerContainer}>
          {playerHightlighted && (
            <Player
              url={playerHightlighted?.url}
              muted={playerHightlighted?.muted}
              playing={playerHightlighted?.playing}
              isActive={true}
            />
          )}
        </div>
        <div className={styles.inActivePlayerContainer}>
          {Object.keys(nonHighlightedPlayers).map((playerId) => {
            const { url, muted, playing } = nonHighlightedPlayers[playerId];
            return (
              <Player
                key={playerId}
                url={url}
                muted={muted}
                playing={playing}
                isActive={false}
              />
            );
          })}
        </div>
        <CopySection roomId={roomId} />
        <Botton
          muted={playerHightlighted?.muted}
          playing={playerHightlighted?.playing}
          toggleAudio={toggleAudio}
          toggleVideo={toggleVideo}
          leaveRoom={leaveRoom}
        />
      </div>
    </div>
  );
};

export default Room;
