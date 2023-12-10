const Chat = require('../model/chatModel')
const User = require('../model/userModel')

const accessChat = async(req,res) => {
    const {userId} = req.body
    if(!userId){
        console.log("UserId was not sent with the request!");
        res.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users: {$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    })
     .populate("users","-password")
     .populate("latestMessage")

    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email"
    })

    if(isChat.length > 0){
        res.send(isChat[0])
    } else{
        var chatData = {
            chatName: "sender",
            isGroupChat:false,
            users:[req.user._id, userId]
        }
        try{
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password")
            res.status(200).send(fullChat)
        } catch(err){
            res.send("chat error", err)
        }
        
    }
}

const fetchChat = async(req,res) => {
    try {
        await Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
         .populate("users", "-password")
         .populate("groupAdmin", "-password")
         .populate("latestMessage")
         .sort({updatedAt:-1})
         .then(async(result) => {
            await User.populate(result,{
                path:"latestMessage.sender",
                select:'name pic email'
            })
            res.send(result)
         })
        
    } catch (error) {
        
    }
}

module.exports = { accessChat, fetchChat };