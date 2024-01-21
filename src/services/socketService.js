const { Server } = require("socket.io");

let io;

function init(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "*", // Set this to your frontend URL in production
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

    });
}

function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = {
    init,
    getIO
};
