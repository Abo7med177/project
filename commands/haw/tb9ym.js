const db = require("./../../models/haw")
const { MessageEmbed } = require("discord.js")
const { lspd } = require("./../../config.json")
module.exports = { 
    name: "بصمة",
    run: async(client,message,args) => {


const ar = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username === args.slice(1).join(" ")) 
        if(!message.member.roles.cache.has(lspd)) return;
if(!ar) return message.reply("نرجوا منك منشن الشخص لكي التعرف عليه | :x:")
  db.findOne({user: ar.id}, async(err,data)=> {
        if(err) throw err;
    
        if(data) {
const users = message.guild.members.cache.get(data.user)
            const embed = new MessageEmbed()
           .setTitle(" Identity Card : ")
.setDescription(`**
- اسمه : ${data.name}
- جنسه : ${data.sex}
- سنه ميلاده : ${data.snh}
- جنسيته : ${data.mylad}
- رقم هويه : ${data.haw}
- اشاره له : ${users}
- حاله الهويه : ${data.condition}
- صوره : 
**`)
            .setColor("BLUE")
            .setImage(data.url)
            .setFooter(`الاحوال المدنيه ، طلب من : ${message.author.tag}`)
            message.channel.send({
                embeds:[embed]
            })
        }  else {
            message.reply({
                embeds:[
                    new MessageEmbed()
                    .setTitle("Erorr | :x:")
                    .setDescription(`**__ لم اجد هويه  __**`)
                    .setColor("RED")
                ]
            })
        }
    })
 }
}