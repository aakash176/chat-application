const mongoose = require('mongoose')
const connection_string =
  "mongodb+srv://john:1234@nodeexpress.nuanlcd.mongodb.net/ChatUser?retryWrites=true&w=majority";
const ConnectDB = async() => {
    await mongoose.connect(connection_string, {
        
    }).then(() => {console.log("Connected to Database")}).catch((error) => {console.log(error);})
}
module.exports = ConnectDB