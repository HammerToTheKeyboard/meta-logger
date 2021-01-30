const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    messageId: {
        required: true,
        type: String
    },
    authorId: {
        required: true,
        type: String
    },
    channelId: {
        required: true,
        type: String
    },
    createdAt:{
        required: true,
        type: Date
    },
    isCommand: {
        required: true,
        type: Boolean
    },
    hasEmote: {
        required: true,
        type: Boolean
    },
    length: {
        required: true,
        type: Number
    }
    //premiumType: {
    //    required: true,
    //    type: Number
    //}
})

module.exports = mongoose.model("Message", messageSchema)