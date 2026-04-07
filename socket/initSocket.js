import { Server } from "socket.io";
import driver from '../models/driverModels.js'
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true
    }
  });

const drivers = {};

io.on("connection", (socket) => {
  console.log("🔌 Connected:", socket.id);

  socket.on("start-journey", ({ _id, fullname, busLine, busCode }) => {
    socket._id = _id;

    drivers[_id] = {
      _id,
      fullname,
      busLine,
      busCode,
      lat: null,
      lng: null,
      socketId: socket.id
    };
console.log(drivers);

    
    io.emit("driversUpdate", drivers);
  });

  socket.on("driverLocation", ({ lat, lng }) => {
    console.log("Id ",socket._id);
    
    if (!socket._id) return;
console.log(lat);

    if (drivers[socket._id]) {
      drivers[socket._id].lat = lat;
      drivers[socket._id].lng = lng;
console.log(drivers);

      io.emit("driversUpdate", drivers);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id);

    if (socket._id && drivers[socket._id]) {
      delete drivers[socket._id];

      io.emit("driversUpdate", drivers);
    }
  });
});

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket hali init qilinmagan!");
  }
  return io;
};