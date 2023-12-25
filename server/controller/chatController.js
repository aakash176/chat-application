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
        console.log(error);
    }
}

const createGroupChat = async(req,res) => {

    if(!req.body.name || !req.body.users){
        res.status(400).send({message:"Please fill all the details"})
    }
    var users = JSON.parse(req.body.users)
    if(users.length < 2){
        res.status(400).send({mesage:"More than 2 people is required including you to create group chat "})
    }

    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin","-password")
        console.log("full Group Chat", fullGroupChat);
        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.send("error while creating group chat")
    }
    
}

const renameGroupChat = async(req,res) => {
    const updatedChat = await Chat.findByIdAndUpdate(
        req.body._id,
        {
            chatName:req.body.chatName
        },
        {
            new:true
        }
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!updatedChat){
        res.status(400).json({message:"chat not found"})
    }
    else{
        res.status(200).send(updatedChat)
    }
}

const updateMembers = async(req,res) => {
    let newUsers = [...req.body.users, req.user]
    const updatedChat = await Chat.findByIdAndUpdate(
        req.body._id,
        {users:newUsers},
        {new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin", "-password");
    if(!updatedChat){
        res.status(400).json({message:"Chat not found"})
    }
    else{
        res.status(200).send(updatedChat)
    }
}

const leaveGroup = async(req,res) => {
    console.log(req.body);
    const updatedChat = await Chat.findByIdAndUpdate(
        req.body._id,
        {users:req.body.users},
        {new:true}
    )
    .populate("users","-password")
    .populate("groupAdmin", "-password");
    console.log("after leave", updatedChat);
    if(!updatedChat){
        res.status(400).send("Chat not found")
    }
    else{
        res.status(201).send(updatedChat)
    }
}
module.exports = { accessChat, fetchChat, createGroupChat, renameGroupChat, updateMembers, leaveGroup };