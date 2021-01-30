const Discord = require("discord.js")
const fs      = require("fs")
const config = JSON.parse(fs.readFileSync("config.json","utf8"))
const emojiRegex = require("emoji-regex/RGI_Emoji")
const regex = emojiRegex()
const Message = require("./messageSchema")

module.exports = async function (msg){
    if(!msg.author.bot){        
        const messageId   = msg.id
        const authorId    = msg.author.id
        const channelId   = msg.channel.id
        const createdAt   = msg.createdAt
        const length      = msg.cleanContent.length
        //const premiumType = msg.author.flags.premium_type        
        let isCommand, hasEmote        

        try {
            if(msg.cleanContent.startsWith(config.prefix)){
                isCommand = true
            } else {
                isCommand = false
            }
        } catch (error) {
            console.log(error)
        }

        try {
            const discordEmoji = msg.cleanContent.match(/<a:.+?:\d+>|<:.+?:\d+>/g)
            const unicodeEmoji = regex.exec(msg.cleanContent)
            if (discordEmoji||unicodeEmoji) {
                hasEmote = true
            } else {
                hasEmote = false
            }
        } catch (error) {
            console.log(error)
        }  

        try {
            const newMessage = await new Message({ messageId: messageId, authorId: authorId, channelId: channelId, createdAt:createdAt, isCommand: isCommand, hasEmote: hasEmote, length: length, /*premiumType: premiumType*/ }).save()
            if(newMessage){return console.log("Message has been logged")}
        } catch (error) {
            console.log(error)
        }
    }
}