const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true,
    },
    // user:[{
    //     type:  mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // }],

    user_email:{
        type: String,
        required: true,

    },
    chatroom:{
        type: String,
     
    },
    // fromUser:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // toUser:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }


},{
    timestamps: {
        type: Number,
        default: Date.now()
    }
})

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
