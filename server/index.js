import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true,
    }
});

let rooms = new Map(); // Using a Map to manage rooms and players

io.on('connection', (socket) => {
    console.log("New user connected: " + socket.id);

    socket.on("enter", (data) => {
        console.log(`${data.name} joined the room with code ${data.code}`);

        if (!rooms.has(data.code)) {
            rooms.set(data.code, {
                players: [{ id: socket.id, name: data.name }],
                currentPlayer: 1
            });
            socket.emit("player1", `You are player 1`);
        } else {
            const room = rooms.get(data.code);
            if (room.players.length >= 2) {
                socket.emit("roomFull", `Room ${data.code} is full.`);
                return;
            }
            room.players.push({ id: socket.id, name: data.name });
            socket.emit("player2", `You are player 2`);
        }
        socket.join(data.code);
        socket.emit("entry", `You have entered a room with code ${data.code}`);
        socket.to(data.code).emit("other", `${data.name} has joined the room`);
    });

    socket.on("turn", (data) => {
        const { newData, code, chaal } = data;
        io.to(code).emit("turnR", { newData, chaal });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        rooms.forEach((room, code) => {
            const playerIndex = room.players.findIndex(player => player.id === socket.id);
            if (playerIndex !== -1) {
                room.players.splice(playerIndex, 1);
                if (room.players.length === 0) {
                    rooms.delete(code);
                }
                io.to(code).emit('playerLeft', `Player ${playerIndex + 1} left the game.`);
            }
        });
    });
});

app.use(cors());

app.get('/', function (req, res) {
    res.send("Server is running");
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
