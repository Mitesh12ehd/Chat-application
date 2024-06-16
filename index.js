const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

//socket.io
io.on("connection", (socket) => {
    // console.log("connected");

    socket.on("message",(msg) => {
        // console.log(msg);

        //it ditribute message to all user except user that send the message
        socket.broadcast.emit("message",msg);
    })
})

app.get("/",(req,res) => {
    res.sendFile("./public/index.html");
})

server.listen(8000,() => {
    console.log("Server started on port 8000");
})