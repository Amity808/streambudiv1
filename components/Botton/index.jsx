import ReactPlayer from "react-player";
import cs from "classnames"
import style from "./index.module.css"
const Player = (props) => {
    const {playerId, url, muted, playing, isActive} = props;
    return (
        <div className={cs()}>
            <ReactPlayer
            key={playerId} url={url} muted={muted} playing={playing} isActive={isActive} />
        </div>
    )
}


export default Player