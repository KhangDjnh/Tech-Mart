const authSocket = require("../middleware/authSocket");
const newConnectionHandler = require("../socketHandlers/newConnectionHandler");
const disconnectHandler = require("../socketHandlers/disconnectionHandler");

const serverStore = require("../utils/serverStore");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineCustomers = () => {
    const onlineCustomers = serverStore.getOnlineUsers();
    io.emit("online-customers", { onlineCustomers });
  };

  io.on("connection", (socket) => {
    console.log("User connected");
    console.log(socket.id);

    newConnectionHandler(socket, io);
    emitOnlineCustomers;

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineCustomers();
  }, [1000 * 8]);
};

module.exports = {
  registerSocketServer,
};
