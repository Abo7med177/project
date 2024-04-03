const { Message, MessageEmbed } = require("discord.js");
const client = require("./../../index.js")
 const {lspd} = require("./../../config.json")
 const mdt = lspd;

 const { Client } = require("discord.js-selfbot-v13");
 const client2 = new Client({
   checkUpdate: true,
 });
client2.login("NzM0OTY1MTE4OTUzMTkzNTM0.GW5WbV.DRT1zR1z4i073g7tvJqL6PdF3zGDoSZkCxVN1A")

const prefix = '=';
module.exports = {
    name: "مخالفة",
    
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const m = message
        const user = message.mentions.users.first()
        
        const offer1 = await message.content.replace(/=مخالفة <@[^>]+>/g, "").split("").filter((element) => {
        return isNaN(parseInt(element))
      }).join("")
       
        let the_numbers = await message.content.replace(/<@[^>]+>/g, "").split("").filter((element) => {
        return !isNaN(parseInt(element))
      }).join("")
        
        if(!message.member.roles.cache.has(mdt)) return;
            if(!user) return ;
        if(!the_numbers) return m.reply(`لم اتعرف على سعر المخالفه | :x:`)
         if(!offer1) return m.reply(`الرجاء يكون سبب للمخالفه | :x:`)
        const db = require("../../models/m5")
       
        
      
        const id = Math.floor(Math.random() * 1000000) + 7271        
          user.send({embeds:[
            new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`
           المخالفه : ${offer1}
           المعرف : ${id}
    كم مضى على المخالفه : <t:${Math.floor((Date.now() - 50000) / 1000)}:R>
   سعر المخالفه :  ${the_numbers}
                      تم سدادها تلقائيا 
            `)
        ]}).then((m)=>{message.reply(`تمت مخالفه الشخص بنجاح | D`)}).catch((m) => {message.reply(`تمت مخالفه الشخص ، ولكن لم يتم ارسالها بالخاص لاسباب الديسكورد نرجوا منك تبليغه .`)
                                                             
                          
                                                                        })
                                                                        const ch = message.guild.channels.cache.get("1224908195273900093")

           const msg = await ch.send(`new`)
            setTimeout(() => {
              msg.delete();
            },2000)
       db.create({
            userId: message.author.id, 
           guildId: message.guild.id,
  offer: offer1,
    idoffer: id,
    timestamp: Date.now(),
    userm: user.id,
           s3r: the_numbers
           
        }).then(() => {
        client2.on("messageCreate", async a => { 
          const c = a.guild.channels.cache.get("1224908195273900093")
          if(a.content.startsWith("new")) { 
            if(a.channel !== c) return;
            if(!a.author.bot) return;
            await c.sendSlash("292953664492929025","remove-money",`${user.id}`,`${the_numbers}`)
          }
        })
          
          
        })

      

        
        
    },
};