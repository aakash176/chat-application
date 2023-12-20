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

app.listen(PORT, () => {
    if(ConnectDB()){
      console.log(`app is listening to port ${PORT}`)

    }

});
