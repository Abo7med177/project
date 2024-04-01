const db = require("./../../models/haw");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "هويتي", 
    run: async(client,message,args) => {
    
        db.findOne({user: message.author.id}, async(err,data)=> {
            if(err) throw err;

          if(data) {
const users = message.guild.members.cache.get(data.user)
                 const embed = new MessageEmbed()

           .setTitle(" Identity Card : ")
.setDescription(`**
- الاسم : ${data.name}
- الجنس : ${data.sex}
- سنه ميلادك : ${data.snh}
- جنسيتك : ${data.mylad}
- رقم الهويه : ${data.haw}
- اشاره لك : ${users}
- حاله الهويه : ${data.condition}
- صوره : 
**`)
            .setColor("BLUE")
            .setImage(data.url)
                message.channel.send({
                    embeds:[embed]
                })
            } else {
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