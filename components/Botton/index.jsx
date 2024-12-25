import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react"
import cx from "classnames"
import style from "./index.module.css"
const Botton = (props) => {
    const { muted, playing, toggleVideo, toggleAudio, leaveRoom } = props;

    return (
        <div className={style.bottomMenu}>
            {muted ? <MicOff className={cx(style.icon, style.active, style.bottom)} size={55} onClick={toggleAudio}/> : <Mic className={style.icon} onClick={toggleAudio} size={55} />}
            {playing ? <Video size={55} className={cx(style.icon, style.bottom)} onClick={toggleVideo} /> : <VideoOff onClick={toggleVideo} className={cx(style.icon, style.active, style.bottom)} size={55} />}
            <PhoneOff onClick={leaveRoom} className={cx(style.icon, style.bottom)} size={55} />
        </div>
    )
}


export default Botton