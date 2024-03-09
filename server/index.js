import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log("You enter in room with id: " + socket.id);
})

app.use(cors());

app.get('/', function (req, res) {
    res.send("server is there");
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});
