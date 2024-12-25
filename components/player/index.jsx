import ReactPlayer from "react-player";
import cs from "classnames"
import style from "./index.module.css"
const Player = (props) => {
    const {playerId, url, muted, playing, isActive} = props;
    return (
        <div className={cs(style.playerContainer, {
            [style.active]: isActive,
            [style.notActive]: !isActive,
            //[style.notPlaying]: !playing
        })}>
            <ReactPlayer
            key={playerId} url={url} muted={muted} playing={playing} isActive={isActive} height={"100%"} width={"100%"} />
        </div>
    )
}


export default Player