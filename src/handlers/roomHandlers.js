const { v4: UUIDv4 } = require("uuid");

const roomHandler = (socket) => {
    
    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
        console.log("Room created id: ", roomId);
    };

    const joinRoom = () => {
        console.log("New room joined");
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
};

module.exports = roomHandler;
