// تعاريف :
const { Database } = require("npm.db")
const db = new Database("database.json")
const client = require("discord.js")
const {MessageEmbed,MessageActionRow,MessageButton} = require("discord.js")
const mangement = ""
// النقاط التلقائية : 
client.on("channelCreate", async ch => {
    if(ch.name.startsWith("ticket-")){ 
        setTimeout(() => {
            ch.send({
                components: [new MessageActionRow().addComponents(new MessageButton().setCustomId("claim").setLabel("استلام").setStyle("PRIMARY"))]
            })
        },2000)
    }
})
client.on("interactionCreate", async i => { 
    if(!i.isButton()) return;
    if(i.customId == "claim") { 
        if(!i.member.roles.cache.has(mangement)) if(!i.member.permissions.has("ADMINISTRATOR")) return;
        i.updete({
            components: [new MessageActionRow().addComponents(new MessageButton().setCustomId("claim1").setLabel(i.user.displayName).setStyle("PRIMARY").setDisabled(true))]
        }).then(() => {
            db.add(`point-ticket${i.user.id}`, 3)
            i.channel.setName(`${i.channel.name}/${i.user.displayName}`)
        }).catch(() => 0)
    
    }
})
