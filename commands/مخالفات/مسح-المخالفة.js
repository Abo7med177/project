 const { Message, Client, MessageEmbed } = require("discord.js");
const {lspd} = require("./../../config.json")
const mdt = lspd;
module.exports = {
    name: "مسح-المخالفة",
 
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message) => {
const db = require('../../models/m5')
       if(!message.member.roles.cache.has(mdt)) return;
        const id = message.content.split(' ').slice(1).join(' ')
        
        if(isNaN(id)) return message.reply(`المعرف ليس رقما | :x:`)
           const db1 = db.findOneAndDelete({idoffer: id }, async(err, data) =>{
    if(err) throw err
    if(data) {
            
message.channel.send({embeds:[
    new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`
    المخالفه : ${data.offer}
     رقم المخالفه  : ${data.idoffer}
      سعر المخالفه : ${data.s3r}
    تم سدادها بنحاح.
    `)
]})
    
} else {
        message.reply(`لم اجد عن هذا الرقم | :x:`)
}
           })
         
       
    },
};
