const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }

    // username:{
    //     type: String,
    //     required: true,
    // }


},{
    timestamps: {
        type: Number,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;