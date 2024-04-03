const { Message, Client, MessageEmbed } = require("discord.js");
const {lspd} = require("./../../config.json")
const mdt = lspd;
module.exports = {
    name: "استعلام-المخالفة",
    aliases: ['id'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        const id = message.content.split(' ').slice(1).join(' ')
        
        if(isNaN(id)) return message.reply(` هذا المعرف ليس رقما | :x:`)
             const db = require("../../models/m5")
        const moment = require("moment")
       const db1 = db.findOne({idoffer: id}, async(err, data) =>{
    if(err) throw err
    if(data) {
        
message.channel.send({embeds:[
    new MessageEmbed()
    .setColor('BLUE')
    .setDescription(`
   وسعرها المخالفه : ${data.offer}
    الرقم المعرف  : ${data.idoffer}
    المخالف للمرور : <@${data.userm}>
    كم مضى على المخالفه : <t:${Math.floor((data.timestamp - 50000) / 1000)}:R>
    سعر المخالفه : ${data.s3r}
    
    `)
]})
    
} else {
         message.reply(`** تعذر عثور المعرف الخاص بالمخالفه **| :x:`)
} 
       } 
                             )
        
        
    },
};
