const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

const socketServer = require("./utils/serverSocket");

const userRouter = require("./routes/UserRouter");
const registerRouter = require("./routes/RegisterRouter");
const loginRouter = require("./routes/LoginRouter");
const confirmRouter = require("./routes/ConfirmRouter");
const forgotPassRouter = require("./routes/ForgotPassRouter");
const cartRouter = require("./routes/CartRouter");
const commentRouter = require("./routes/CommentRouter");
const conversationRouter = require("./routes/ConversationRouter");
const messageRouter = require("./routes/MessageRouter");
const orderRouter = require("./routes/OrderRouter");
const productRouter = require("./routes/ProductRouter");
const shopRouter = require("./routes/ShopRouter");
const tagRouter = require("./routes/TagRouter");

require("dotenv").config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
socketServer.registerSocketServer(server);

server.listen(PORT, () => {
  console.log(`Application listening on ${PORT} !`);
});

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connection successful...");
  })
  .catch((err) => {
    console.log("MongoDB connection failed", err.message);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the Tech-Mart API!");
});

app.use("/api/user", userRouter);
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/forgot_pass", forgotPassRouter);
app.use("/api/confirm", confirmRouter);
app.use("/api/cart", cartRouter);
app.use("/api/comment", commentRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/shop", shopRouter);
app.use("/api/tag", tagRouter);



module.exports = app;