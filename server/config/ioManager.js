const socketIo = require("socket.io");

let io;

function init(server){
    io = socketIo(server,{
        cors: {
            origin: "http://localhost:3000", // Replace with your desired origin
        }
    })

    io.on("connection",(socket) => {
        console.log(`⚡: ${socket.id} user just connected!`);
    
    
        socket.on("disconnect", () => {
            console.log("🔥: A user disconnected");
            socket.disconnect();
        });
    })
}

function getIo(){
    if(!io){
        throw new Error('Socket.io has not been initialized yet.');
    }
    return io;
}

module.exports = {
    init,
    getIo,
  };