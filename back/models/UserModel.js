const { Schema, model } = require('mongoose')

const UserData = new Schema({
    username: {
        type: String,
        required: false
    },
    stack: {
        type: String,
        required: false
    },
    skills: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    cv: {
        type: String,
        required: false
    },
    checkbox: {
        type: Boolean,
        required: false
    }
})

module.exports = model('UserData', UserData)