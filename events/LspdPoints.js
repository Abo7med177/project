const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const client = require("./../index")
const { Database } = require("npm.db")
const db = new Database("database.json")
const n86 = "1131019771647897671"
const lspd = "1117878611358269611";
const channel = "1156643329262497883";
const { prefix } = require("./../config.json")
client.on("messageCreate", async(message) => {
  const m = message;
  if(message.content.startsWith("login")) {
    if(!message.member.permissions.has("ADMINISTRATOR")) return ;
    const b1 = new MessageButton()
    .setCustomId("login")
    .setStyle("SUCCESS")
    .setLabel("تسجيل دخول")
    .setEmoji("1134936709205864458")
      const b2 = new MessageButton()
      .setCustomId("logout")
      .setStyle("DANGER")
      .setLabel("تسجيل خروج")
      .setEmoji("1134936710850035742")
      const b3 = new MessageButton()
      .setCustomId("online")
      .setStyle("SECONDARY")
      .setLabel("المباشرين")
      .setEmoji("1135026502031913121")
const embed = new MessageEmbed()
    .setTitle("**تسجيل دخول وخروج خاص بالعساكر**")
    .setColor("YELLOW")
    .setDescription(`**
\`\`\`
              وزارة الداخلية
\`\`\`
يجب عليك عند دخولك للرحلة تسجيل الدخول
لتسجيلك في قائمة المباشرين
يجب الالتزام وعدم التلاعب بالازرار
عند خروجك من الرحلة يجب عليك تسجيل خروج

# وزارة الداخلية                        
    **`).setFooter(message.guild.name).setImage("https://cdn.discordapp.com/attachments/1099752762620780725/1221148310849454170/Golden-sheild-season-2-info-el-mbashreen---yellow--.jpg?ex=661185fd&is=65ff10fd&hm=3d6fe642652bcfea2002b15be30fba0a8ff6d3bc1940e22dc5d5d4ddd74fff34&")
    const msg = await message.channel.send({
      embeds: [embed],
      components:[
        new MessageActionRow().addComponents(b1,b2,b3)
      ]
    })
  }
})
const bd = require("./../models/log")
client.on("interactionCreate", async(inter) => {
  if(inter.isButton()) {
    if(inter.replied) return;
    
  
   
  const ch = inter.client.channels.cache.get(channel)
    if(inter.customId === "login") {
        if(!inter.member.roles.cache.has(lspd)) return inter.reply({
            content: "طاقم lspd فقط", ephemeral: true
          })
      if(inter.replied) return;
      bd.findOne({userId: inter.user.id}, async(err,data) => {
        if(err) throw err;
        if(data) {
          inter.reply({content: "هنالك تسجيل دخول قبل", ephemeral: true})
        } else {
          const points = db.add(`police${inter.user.id}`, 1)
            const point = db.fetch(`police${inter.user.id}`)
           bd.create({
             m3lomat: "دخول",
             userId: inter.user.id
           })
            const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("تم تسجيل دخولك بنجاح")
            .setDescription(`**
            نقاطك الان : [${point || 0}]
            بامكانك مباشره الميدان
            **`)
             inter.reply({embeds: [embed], ephemeral: true})
           ch.send({
             embeds: [
               new MessageEmbed()
               .setTitle("تم تسجيل دخول عسكري الان")
               .setDescription(`**
               العسكري : ${inter.user}
               نقاطه : ${point || 0}
               الوقت : <t:${Math.floor((Date.now() - 50000) / 1000)}:R>
               **`).setColor("YELLOW")
             ]
           })
        }
      })

    }else if(inter.customId === "logout") {
        if(!inter.member.roles.cache.has(lspd)) return inter.reply({
            content: "طاقم lspd فقط", ephemeral: true
          })
      if(inter.replied) return;
  bd.findOneAndDelete({userId: inter.user.id}, async(err, data) =>{
    if(err) throw err;
    if(data) {
      const point = db.fetch(`police-login${inter.user.id}`) || 0;
      const embed = new MessageEmbed()
      .setColor("DARK_RED")
      .setTitle("تم تسجيل خروجك بنجاح")
      .setDescription(`**
- نقاط تسجيل خروج : 
\`${db.fetch(`police-login${inter.user.id}`) || "لايوجد"}\`

      **`)
       inter.reply({embeds: [embed], ephemeral: true})
      ch.send({
         embeds: [
           new MessageEmbed()
           .setTitle("تم تسجيل خروج عسكري الان")
           .setDescription(`**
           العسكري : ${inter.user}
           نقاطه : ${point || 0}
           الوقت : <t:${Math.floor((Date.now() - 50000) / 1000)}:R>
           **`).setColor("YELLOW")
         ]
       })
    } else {
      inter.reply({content: "لم تقوم بتسجيل دخول قبل", ephemeral: true})
    }
  })
      
    } else if(inter.customId == "online") { 
        const m5 = await bd.find({
            m3lomat: "دخول"
          });
  
          const embedsetDescription = m5.map((data) => {
          const userId = inter.guild.members.cache.get(data.userId)
  
  
          return [
          `<:GOLDEN67:1135026502031913121> - ${userId}`, 
          ].join("\n");
          }) 
        await  inter.reply({
            embeds: [
                new MessageEmbed()
                .setTitle("المباشرين | <:GOLDEN67:1135026502031913121> ")
                .setDescription(`${embedsetDescription}`)
                .setFooter("وزاره الداخليه").setColor("YELLOW")
                .setImage("https://cdn.discordapp.com/attachments/1099752762620780725/1221148310849454170/Golden-sheild-season-2-info-el-mbashreen---yellow--.jpg?ex=661185fd&is=65ff10fd&hm=3d6fe642652bcfea2002b15be30fba0a8ff6d3bc1940e22dc5d5d4ddd74fff34&")
            ],
            ephemeral: true
          })

    }
  }
})

client.on("messageCreate", async(m) => {
  if(m.content.startsWith(prefix + "نقاط")) {
     if(!m.member.roles.cache.has(lspd)) return;
    const user = m.mentions.members.first() || m.author
    const point = db.fetch(`police${user.id}`)
    
    const embed = new MessageEmbed()
    .setColor("DARK_BLUE")
    .setTitle(`استعلام النقاط :`)
    .setDescription(`**
- نقاط  : 
\`${db.fetch(`police${user.id}`) || "لايوجد"}\`
          **`)
  m.reply({embeds: [embed]})
  }
})
client.on("messageCreate", async(m) => {
  const message = m;
  if(message.content.startsWith(prefix + 'اضافه-نقطه')) {
     if(!message.member.roles.cache.has(n86)) return;
     const user = m.mentions.members.first()
    if(!user) return m.reply("منشن العسكري")
     const ar = message.content.split(' ').slice(2).join(" ")
    if(isNaN(ar)) return m.reply("ارقام ققط")
  
  db.add(`police${user.id}`, `${ar}`)
     let points = await db.fetch(`police${message.author.id}`);
    message.channel.send(`** ${message.author} تـم إعطاء نقطة بـنجـاح**`)
  }
})
client.on("messageCreate", async(m) => {
  const message = m;
  if(message.content.startsWith(prefix + 'خصم-نقطه')) {
     if(!message.member.roles.cache.has(n86)) return;
     const user = m.mentions.members.first()
     const ar = message.content.split(' ').slice(2).join(" ")
  
     if(!user) return m.reply("منشن العسكري")
    if(user === m.author) return m.reply("**لايمكنك سحب نقاط بنفسك**")
      if(isNaN(ar)) return m.reply("** اكتب النقاط بشكل صحيح**")
    
 db.substr(`police${user.id}`, `${ar}`)
       message.channel.send(`** ${message.author} تـم سحب نقطة بـنجـاح**`)
   
  }
 
})
client.on("messageCreate", async(m) => {
  if(m.content.startsWith(prefix + "تصفير")) {
     if(!m.member.roles.cache.has("ADMINISTRATOR")) return;
    try {
    db.deleteAll()
      m.reply(`تمت عمليه تصفير السيرفر بنجاح | ${m.guild.name}`)

    } catch {
      m.reply("لم اجد على نقاط للتصفير")
    }
  
  
  
    
  }
})