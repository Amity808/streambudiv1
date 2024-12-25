import cs from "classnames"
import style from "./index.module.css"
import { Copy } from "lucide-react"
import { CopyToClipboard } from "react-copy-to-clipboard"
const CopySection = (props) => {
    const {roomId} = props;
    return (
        <div className={style.copyContainer}>
            <div className={style.copyHeading}>
                Copy Room Id
            </div>
            <hr className="hr"/>
            <div className={style.copyDescription}>
                <span>{roomId}</span>
                <CopyToClipboard text={roomId}>
                    <Copy className={`ml-3 cursor-pointer`} />
                </CopyToClipboard>
            </div>
        </div>
    )
}


export default CopySection