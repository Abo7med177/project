const db = require("./../../models/haw")
const { MessageEmbed } = require("discord.js")
const { lspd } = require("./../../config.json")
module.exports = { 
    name: "يحث-هوية",
    run: async(client,message,args) => {
const ar = message.content.split(' ').slice(1).join(" ")


    if(!message.member.roles.cache.has(lspd)) return;

  db.findOne({haw: ar}, async(err,data)=> {
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
- رقم الهويه : ${data.haw}
- اشاره لشخص : ${users}
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