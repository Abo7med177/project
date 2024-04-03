// تعاريف :
const { Database } = require("npm.db")
const db = new Database("database.json")
const client = require("./../index")
const {MessageEmbed,MessageActionRow,MessageButton} = require("discord.js")
const mangement = "1117867637913944074"
const prefix = "#"
const perm = "1123963696415260744"
// النقاط التلقائية : 
client.on("channelCreate", (ch) => {
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
        i.update({
            components: [new MessageActionRow().addComponents(new MessageButton().setCustomId("claim1").setLabel(i.user.displayName).setStyle("PRIMARY").setDisabled(true))]
        }).then(() => {
            db.add(`point-ticket${i.user.id}`, 1)
            i.channel.setName(`${i.channel.name}/${i.user.tag}`)
        }).catch(() => 0)
    
    }
})
// اعطاء نقاط وسحبها : 
client.on("messageCreate", async m => {
    const message = m;

    if(m.content.startsWith(prefix + "نقاط")) {
        if(!m.member.roles.cache.has(mangement)) if(!m.member.permissions.has("ADMINISTRATOR")) return;
        const user = m.mentions.members.first() || m.author
        const point = db.fetch(`points${user.id}`) || 0
        const ticket = db.fetch(`point-ticket${user.id}`) || 0
        const ac = db.fetch(`point-ac${user.id}`) || 0
        const game = db.fetch(`point-game${user.id}`) || 0
        const embed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle(`استعلام النقاط :`)
        .setDescription(`**
- نقاط تفعيل : 
    \`${ac}\`
- نقاط التذاكر : 
    \`${ticket}\`
- نقاط مضافه : 
    \`${point}\`
- نقاط الاقيام : 
    \`${game}\`
- مجموعهم : 
    ${point + ac + ticket + game}
              **`)
      m.reply({embeds: [embed]})
    }else if(m.content.startsWith(prefix + "اضافه-نقاط")) {
        if(!m.member.roles.cache.has(perm)) if(!m.member.permissions.has("ADMINISTRATOR")) return;
        const user = m.mentions.members.first()
        const ar = message.content.split(' ').slice(2).join(" ")
     
        if(!user) return m.reply("منشن الاداري")
       if(user === m.author) return m.reply("**لايمكنك اضافه نقاط بنفسك**")
         if(isNaN(ar)) return m.reply("** اكتب النقاط بشكل صحيح**")
       
    db.add(`points${user.id}`, `${ar}`)
          message.channel.send(`** ${message.author} تـم اضافه نقطة بـنجـاح**`)
      
    } else if(m.content.startsWith(prefix + "خصم-نقاط")) {
        if(!m.member.roles.cache.has(perm)) if(!m.member.permissions.has("ADMINISTRATOR")) return;
     const user = m.mentions.members.first()
     const ar = message.content.split(' ').slice(2).join(" ")
  
     if(!user) return m.reply("منشن الاداري")
    if(user === m.author) return m.reply("**لايمكنك سحب نقاط بنفسك**")
      if(isNaN(ar)) return m.reply("** اكتب النقاط بشكل صحيح**")
    
 db.substr(`points${user.id}`, `${ar}`)
       message.channel.send(`** ${message.author} تـم سحب نقطة بـنجـاح**`)
   
    }
})