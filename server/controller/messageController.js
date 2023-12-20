const MessageModel = require('../model/messageModel')
const User = require('../model/userModel')
const Chat = require('../model/chatModel')




const allMessages = async(req,res) => {
    try {

        console.log('req',req.params);
        const messages = await MessageModel.find({chat:req.params.chatId})
        .populate("sender", "name pic")
        .populate("chat")

        res.json(messages)
        
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
}


const sendMessage = async(req,res) => {

    try{

        const {content, chatId} = req.body
        if(!content || !chatId){
            console.log("Invalid content or chatId");
            return res.status(400)
        }
    
        const newMessage = {sender:req.user._id, content:content, chat:chatId}
        var message = await MessageModel.create(newMessage)
        console.log('message', message);
        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path:"chat.users",
            select:"name pic email"
        })
    
        await Chat.findByIdAndUpdate(req.body.chatId, {latestMessage:message})
        res.json(message)
    } catch(err){
        res.status(400)
        throw new Error(err.message)
    }
}



module.exports = {sendMessage, allMessages}