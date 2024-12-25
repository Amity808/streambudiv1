import { Server } from "socket.io"


const SocketHandler = (req, res) => {

    if (res.socket.server.io) {
        console.log("Socket already connected")
    } else {
        const io = new Server(res.socket.server)

        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log("server connected")
            socket.on("join-room", (roomId, userId) => {
                console.log("new user from websocket")
                console.log("a new user with id " + roomId + " joined" + userId);
                socket.join(roomId);
                socket.broadcast.to(roomId).emit("user-connected", userId) // id == userId
            })

        })
    }
    res.end()
}

export default SocketHandler;