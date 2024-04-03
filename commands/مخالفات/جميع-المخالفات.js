const db = require("../../models/m5");
const WarnModel = db;
const { MessageEmbed } = require("discord.js")
const {lspd} = require("./../../config.json")
const mdt = lspd;
module.exports = {
    name: "المخالفات", 
    
run: async (client, message) => {
    if(!message.member.roles.cache.has(mdt)) return;

const user = message.mentions.members.first() 
if(user) {
    const m5 = await db.find({
            userId: user.id,
        guildId: message.guild.id,
    });
    if (!m5?.length) return message.reply({content:`** لايوجد مخالفات لهذا الشخص ** ${user} ⚠️`}) 
    const embedsetDescription = m5.map((data) => {
        const userId = message.guild.members.cache.get(data.userId)
    

    return [
        `الشخص الذي خالف: ${userId}`, 
        `رقم المخالفه   : ${data.idoffer}, `, 
        `المخالفه : ${data.offer}`, 
        `شخص المخالف لامر مروري : <@${data.userm}> `,
        ` كم مضى على المخالفه : <t:${Math.floor((data.timestamp - 50000) / 1000)}:R>`,
`سعر المخالفه : ${data.s3r}`,
       
     ].join("\n");
})
.join("\n\n");
    
    const m51 = new MessageEmbed()
.setTitle(`جميع مخالفات ${user}`)
    .setDescription(embedsetDescription)
.setColor("RANDOM")
    message.channel.send({embeds: [m51]})
    //السي
}else {
    const userwarnings = await WarnModel.find({
        guildId: message.guild.id,
    });
    if (!userwarnings?.length) return message.reply({content:`** لايوجد مخالفات لهذا سيرفر !**  ⚠️`}) 
    const embedsetDescription = userwarnings.map((data) => {
        const userId = message.guild.members.cache.get(data.userId)
    

    return [
            `الشخص الذي خالف: ${userId}`, 
        `رقم المخالفه   : ${data.idoffer}, `, 
        
        `المخالفه : ${data.offer}`, 
        `شخص المخالف لامر مروري : <@${data.userm}>`,
       ` كم مضى على المخالفه : <t:${Math.floor((data.timestamp - 50000) / 1000)}:R>`,
        `سعر المخالفه : ${data.s3r}`,
     ].join("\n");
    })
.join("\n\n");
    
    const warnings = new MessageEmbed()
.setTitle(`مخالفات المدينه`)
    .setDescription(embedsetDescription)
.setColor("RED")
    message.channel.send({embeds: [warnings]})
}

}
}