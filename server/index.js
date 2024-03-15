import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

let players = []; // Array to store players

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log("You enter in room with id: " + socket.id);

    socket.on("set", (data) => {
        const { code, name } = data;

        // Check if the code exists and if there's only one player
        const playerWithCode = players.find(player => player.code === code);
        if (playerWithCode) {
            if (players.length === 1) {
                // Set the second player with the given code
                playerWithCode.player2 = name;
                console.log("Player 2 joined with code: " + code);
                io.emit("gameStart", { player1: playerWithCode.player1, player2: playerWithCode.player2 });
            } else if (players.length === 2) {
                // Room already has two players
                console.log("Room already has two players.");
            }
        } else {
            // Set the first player and their code
            players.push({ code, player1: name });
            console.log("Player 1 joined with code: " + code);
        }
    });

    socket.on("turn", (data)=>{
        io.emit("table", data);
    })

    
});

app.use(cors());

app.get('/', function (req, res) {
    res.send("server is there");
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});
