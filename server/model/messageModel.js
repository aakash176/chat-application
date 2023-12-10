const mongoose = require('mongoose')

const Message = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    content:{type:String, trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId, ref:'Chat'}
},
{
    timestamps:true
})

const MessageModel = mongoose.model('MessageModel', Message)
module.exports = MessageModel