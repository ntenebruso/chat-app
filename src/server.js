import { createServer } from 'http';
import { Server } from 'socket.io';
import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';

import { createRoom, getRoom, getUser, getAllRooms } from "./utils/rooms";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

app.use(express.urlencoded({ extended: true }))

app.use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
)

io.on('connection', socket => {
    socket.emit("get user id", socket.id);
    socket.on("create room", (room) => {
        createRoom(room);
    });
    socket.on("new user", (room, name) => {
        socket.join(room);
        getRoom(room).users.push({ id: socket.id, name })
    });
    socket.on("chat message", (room, msg) => {
        io.in(room).emit("chat message", { message: msg.trim(), user: getUser(room, socket.id) });
    });
    socket.on("disconnect", () => {
        getAllRooms().forEach(room => {
            var index = room.users.findIndex(user => user.id == socket.id);
            room.users.splice(index, 1);
        })
    })
})

httpServer.listen(PORT)