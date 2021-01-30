const Discord = require("discord.js")
const fs      = require("fs")
const config = JSON.parse(fs.readFileSync("config.json","utf8"))
const client = new Discord.Client()
client.login(config.botToken)
const metaLogger = require("./metaLogger")
//-----------------------------------------------------------------------
const mongoose = require("mongoose")
mongoose.connect(config.dbUrl,  {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true})
.then(() => {
    console.log('== DATABASE CONNECTED ==')
})
.catch(error => {
    console.error('== ! UNABLE TO CONNECT TO DATABASE ! ==')
    console.error(error)
})
//-----------------------------------------------------------------------

client.on("ready", () => console.log("======== READY ========="))
client.on("message", metaLogger)