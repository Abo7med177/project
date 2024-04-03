const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

const { Database } = require("npm.db")
const db = new Database("database.json")

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(client.config.token);
client.on("messageCreate", async (m) => {
    const message = m;
    const args = m.content.split(" ");
    if(m.content.startsWith("=تفعيل")) {
      if(!m.member.roles.cache.has("1117855649720709181")) if(!m.member.permissions.has("ADMINISTRATOR")) return;
      const ar = await message.content.replace(/=تفعيل <@[^>]+>/g, "").split("").filter((element) => {
        return isNaN(parseInt(element))
      }).join("")
  
        let num = await message.content.replace(/=تفعيل <@[^>]+>/g, "").split("").filter((element) => {
        return !isNaN(parseInt(element))
      }).join("")
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((m) => m.user.username === args.slice(1).join(" "))
      if(!member) return m.reply(`** اكتب ايدي الشخص او منشنه **`)
      
  if(!args) return m.reply("** اكتب ايدي الشخص **")
      if(!num) return m.reply({
        embeds: [
          new MessageEmbed()
          .setTitle("مثال :")
          .setColor("YELLOW")
          .setDescription(`
  - =تفعيل ${m.author} [id sony] [id]`)
        ]
      })
      if(isNaN(num)) return m.reply("** اكتب هويه كتابه صحيحه **")
    const role = m.guild.roles.cache.get("1117886666024161373")
      const role1 = m.guild.roles.cache.get("1117886422288957530")
      const role2 = m.guild.roles.cache.get("1222298908227665941")
      member.roles.add(role).catch(() => 0)
      member.roles.add(role1).catch(() => 0)
      member.roles.remove(role2).catch(() => 0)
  member.setNickname(`${ar}#${num}`).then(() => {
    message.reply({
      embeds: [
        new MessageEmbed()
        .setTitle("تفعيل عضو جديد | ✅")
        .setColor("YELLOW")
        .setDescription(`**
  - id&هويه : ${ar}
  - member : ${member}
  - by : ${m.author}
  - points mangement : 1
        **`)
       
        .setAuthor(m.author.tag, m.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
      ]
    })
    db.add(`point-ac${message.author.id}`, 1)
    m.guild.channels.cache.get("1130274633137004634").send({
      embeds: [
        new MessageEmbed()
        .setTitle("تفعيل عضو جديد | ✅")
        .setColor("YELLOW")
        .setDescription(`**
  - ايدي العضو | ${ar}
  - هويته | ${num}
  - اشاره له | ${member}
  - تم تفعيله بواسطه | ${m.author}
  
        **`)
        .setAuthor(m.author.tag, m.author.displayAvatarURL({ dynamic: true }))
        .setFooter("سجل التفعيل")
      ]
    })
  })
                                        }
  })
 
client.on('messageCreate', async message => {
    if (message.channel.id === '1158965056835428352' && !message.author.bot) {
        const content = message.content;
        const author = message.author;

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('رسالة جديدة')
            .setDescription(`**من قبل |** ${author}\n**الرسالة |** ${content}\n\n✅ للموافقة\n❌ للرفض`)
            .setFooter('برنامج X بخدمتكم 🤖')
            .setTimestamp();

        const sentMessage = await message.channel.send({ embeds: [embed] });

        // حذف الرسالة الأصلية
        await message.delete();

        // إضافة التفاعلات
        await sentMessage.react('✅'); // زر "صح"
        await sentMessage.react('❌'); // زر "خطأ"

        // إنشاء مرشح للتفاعلات
        const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && !user.bot;

        // انشاء متغيرات لعدد الموافقين والمعارضين
        let approveCount = 0;
        let rejectCount = 0;

        // استماع للتفاعلات
        const collector = sentMessage.createReactionCollector({ filter, time: 60000 });

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '✅') {
                approveCount++;
            } else if (reaction.emoji.name === '❌') {
                rejectCount++;
            }
        });

        collector.on('end', () => {
            // عرض عدد الموافقين والمعارضين بعد انتهاء مدة الجمع
            const resultEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('نتائج التصويت')
                .setDescription(`عدد الموافقين: ${approveCount}\nعدد المعارضين: ${rejectCount}`)
                .setFooter('برنامج X بخدمتكم 🤖')
                .setTimestamp();

            sentMessage.edit({ embeds: [resultEmbed] });
        });
    }
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('=نشر')) {

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('publish_button')
          .setLabel('نشر المنشور')
          .setStyle('PRIMARY')
      );
    await message.reply({ content: 'اضغط على الزر لنشر المنشور', components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'publish_button') {
    const messageContent = interaction.message.content;
    const time = new Date().toLocaleString();
    const author = interaction.user.tag;

    // Create a modal for user input
    const modalEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('أدخل نص المنشور')
      .setDescription('اكتب محتوى المنشور الذي تريد نشره.')
      .setTimestamp();

    // Send the modal
    const modalMessage = await interaction.reply({ embeds: [modalEmbed], fetchReply: true });

    // Collect the user's input
    const filter = response => response.author.id === interaction.user.id;
    const collector = modalMessage.channel.createMessageCollector({ filter, time: 60000 }); // 60 seconds timeout

    collector.on('collect', async collected => {
      const content = collected.content;
      // Find the log channel
      const logChannel = interaction.guild.channels.cache.get("1158965056835428352");
      if (logChannel) {
        await logChannel.send(`من قبل: ${author}\nالرسالة: ${content}\nالوقت: ${time}`);
        await interaction.followUp('تم نشر المنشور بنجاح!');
      }
      collector.stop();
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        interaction.followUp('لم يتم تقديم رد في الوقت المحدد، لم يتم نشر المنشور.');
      }
    });
  }
});

process.on("uncaughtException", (error) => {
  return;
});

process.on("unhandledRejection", (error) => {
  return;
});

process.on("rejectionHandled", (error) => {
  return;
});
