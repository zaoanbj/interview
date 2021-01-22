const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb://localhost/blog', { useMongoClient: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    last_modify_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/imgs/default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gener: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date,
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema);