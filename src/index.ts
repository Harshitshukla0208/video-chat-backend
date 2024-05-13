import express from "express";
import http from "http";
import config from './config/serverConfig'
import {Server} from "socket.io";
import cors from "cors";

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

    socket.on("disconnect", ()=>{
        console.log("User disconnected");
    })
})

server.listen(config.PORT, () => {
    console.log(`Server started at PORT: ${config.PORT}`)
})