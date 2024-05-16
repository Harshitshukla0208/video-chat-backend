// const { v4: UUIDv4 } = require("uuid");
//a temporary memory db
const rooms = {};

const roomHandler = (socket) => {
    const createRoom = ({roomId}) => {
        // const roomId = UUIDv4();
        socket.join(roomId);

        rooms[roomId] = []; //create a new entry for the room

        socket.emit("room-created", { roomId });
        console.log("Room created id: ", roomId);
    };

    const joinedRoom = ({roomId, peerId}) => {
        if(rooms[roomId]){
            //if the given room id exist in the mem. db
            console.log("New user has joined the room", roomId, "with peerID as ", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId) //makes the user join the socket room

            //when someone joins the room the frontend gona emit this ready event
            socket.on("ready", () => {
                socket.to(roomId).emit("user-joined", {peerId});
            })

            //to check the participants
            socket.emit("get-users", {
                roomId: roomId,
                participants: rooms[roomId]
            });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

module.exports = roomHandler;
