const express = require("express");
const app = express();
const PORT = 5000;
const http = require("http").Server(app);
const cors = require("cors");
const ConnectDB = require('./connectDB/connect');
const userRoute = require('./Routes/userRoute')
const dotenv = require('dotenv')
const chatRoutes = require('./Routes/chatRoutes')
const messageRoute = require('./Routes/messageRoutes')
dotenv.config()
app.use(cors());

app.use(express.json())

app.use('/api/user', userRoute)

app.use('/api/chats',chatRoutes)

app.use('/api/messages',messageRoute)

app.get("/", (req, res) => {
  res.send("Homepage!!");
});

const server = app.listen(PORT, () => {
    if(ConnectDB()){
      console.log(`app is listening to port ${PORT}`)

    }

});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {

  socket.on('setup', (userData)=>{
    socket.join(userData.id)
    socket.emit("connected")
  })

  socket.on('join chat', (room)=>{
    socket.join(room)
    console.log('user joined room', room)
  })

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
})
