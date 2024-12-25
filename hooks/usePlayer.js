import { cloneDeep } from "lodash"
import { useState } from "react"

const usePlayer = (myId) => {
    const [players, setPlayers] = useState({})

    const playerCopy = cloneDeep(players)

    const playerHightlighted = playerCopy[myId]

    delete playerCopy[myId]
    
    const nonHighlightedPlayers = playerCopy





    return { players, setPlayers, playerHightlighted, nonHighlightedPlayers }

}

export default usePlayer