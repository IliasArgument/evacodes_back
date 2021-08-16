const { Schema, model } = require('mongoose')

const UserInterview = new Schema({
    name: { type: String, unique: false, required: false },
    email: { type: String, required: false, unique: false },
})

module.exports = model('UserInterview', UserInterview)