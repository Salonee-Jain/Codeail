const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path');
const PICTURE_PATH = path.join('/uploads/posts/postpics');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    // username:{
    //     type: String,
    //     required: true,
    // }
    //include array of id of comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },

    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
    ,
    postpic: {
        type: String,
    }

}, {
    timestamps: {
        type: Number,
        default: Date.now()
    }
})





let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', PICTURE_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})


//defining the static methods

postSchema.statics.uploadedPostpic = multer({ storage: storage }).single('postpic');
postSchema.statics.postPicPath = PICTURE_PATH;


const Post = mongoose.model('Post', postSchema);
module.exports = Post;
