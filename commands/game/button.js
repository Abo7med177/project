const {MessageEmbed,MessageActionRow,MessageButton} = require("discord.js")
const client = require("../..")
module.exports = { 
    name: "games",
    run: async(client,message,args) => { 
        if(!message.member.permissions.has("ADMINISTRATOR")) return ;
        const btn = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("new")
            .setLabel("فتح رحله")
            .setStyle("PRIMARY")
            .setEmoji("1158404556506538034"),
            new MessageButton()
            .setCustomId("plane")
            .setLabel("اقلاع")
            .setStyle("PRIMARY")
            .setEmoji("1158404557903241326")
            

        )
message.channel.send({
    embeds: [new MessageEmbed().setTitle("صلاحيات فاتح الاقيام | Permission Open game").setColor("YELLOW").setThumbnail(message.guild.iconURL({dynamic: true})).setFooter("Open game").setDescription(`- القوانين : \n> عدم فتح الاقيام دون الاذن من الاونر\n> يمنع تدخل لاعب ليس مفعل او ليس له علاقه بالسيرفر`)],components:[btn]
})
    }
}