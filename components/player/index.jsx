import ReactPlayer from "react-player";
import cs from "classnames";
import style from "./index.module.css";
import { Mic, MicOff, UserSquare2 } from "lucide-react";
const Player = (props) => {
  const { playerId, url, muted, playing, isActive } = props;
  return (
    <div
      className={cs(style.playerContainer, {
        [style.active]: isActive,
        [style.notActive]: !isActive,
        [style.notPlaying]: !playing,
      })}
    >
      {playing ? (
        <ReactPlayer
          key={playerId}
          url={url}
          muted={muted}
          playing={playing}
          isActive={isActive}
          height={"100%"}
          width={"100%"}
        />
      ) : (
        <UserSquare2 className={style.user} size={isActive ? 400 : 150} />
      )}

      {!isActive ? (
        muted ? (
          <MicOff size={23} className={style.icon} />
        ) : (
          <Mic className={style.icon} size={23} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;
