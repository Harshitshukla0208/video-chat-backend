const express = require("express");
const http = require("http");
const config = require("./config/serverConfig");
const { Server } = require("socket.io");
const cors = require("cors");
const roomHandler = require("./handlers/roomHandlers");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New user connected");
    roomHandler(socket); //passing the socket connection for creation of room and joining the room
    
    socket.on("disconnect", ()=>{
        console.log("User disconnected");
    });
});

server.listen(config.PORT, () => {
    console.log(`Server started at PORT: ${config.PORT}`);
});
