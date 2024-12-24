import { Server } from "socket.io"


const SocketHandler = (req, res) => {

    if (res.socket.server.io) {
        console.log("Socket already connected")
    } else {
        const io = new Server(res.socket.server)

        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log("server connected")
        })
    }
    res.end()
}

export default SocketHandler;