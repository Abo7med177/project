const client = require("./../index")
const { MessageEmbed, MessageActionRow, MessageButton, Interaction } = require("discord.js")
const { Modal, TextInputComponent } = require("discord.js")
client.on("messageCreate", async(message) => {
    if(message.content.startsWith("#menu")) {

        if(!message.member.permissions.has("ADMINISTRATOR")) return ;
        const b1 = new MessageButton()
        .setCustomId("08")
        .setStyle("SUCCESS")
        .setLabel("إنشاء هوية")
        const a1 = new MessageActionRow()
        .addComponents(b1)
        const em = new MessageEmbed()
        .setTitle("**__الاحوال المدنية__**")
        .setColor(`DARK_BLUE`)
        .setThumbnail(message.guild.iconURL())
        .setDescription(`**الأحوال المدنية 

        إنشاء هوية - 
       
       - ملاحظة 🔴 | هويتك لا يمكنك الكشف عنها إلا للعسكر او الحكومة بشكل عام ، ايضاً اجباري في حال اي ضابط واجهك تعطيه هويتك لـ التأكد أن وضعك سليم وغير مخالف للدستور والقانون 
       
       
       
       - مخاطر عدم إنشاء الهوية | 1- تعريض نفسك للأشتباه والقبض عليك بشكل دائم 2- في حال عدم توفر معك الهويه تعتبر مجهول 3- في حال تم كشفك دون هويه ب العمل يتم اتخاذ الأجراء الأتي - المرة الأولى يتم إيقاف عنك الراتب إلى أن تصدر هوية المره الثانيه يتم فصلك من الوظيفة وإحالتك إلى الجهات المعنية لتحقيق معك 
       
       
       مع تحيات الأحوال المدنية 
       
       -  : **`)
        message.channel.send({
            embeds: [em],
            components: [a1]
        })
    }
})
client.on("interactionCreate", async(interaction) => {
    const inter = interaction
   
     if(inter.isButton()) {
        if(inter.customId == "08") {

            
          if(inter.replied) return;
           var t1 = new TextInputComponent()
            .setCustomId('asm')
            .setLabel('اسمك واسم العائله')
                .setPlaceholder("فلان بن فلاني")
            .setMaxLength(2)
            .setMaxLength(25)
            .setRequired(true)
            .setStyle("SHORT")
            var t2 = new TextInputComponent()
            .setCustomId('sex')
            .setLabel('الجنس')
                .setPlaceholder("ذكر/انثى")
            .setMaxLength(3)
            .setMaxLength(4)
            .setRequired(true)
            .setStyle("SHORT")
             var t4 = new TextInputComponent()
            .setCustomId('mylad')
            .setLabel("الولايه")
               .setPlaceholder("لوس سانتوس | بوليتو | ساندي شور")   
            .setMaxLength(2)
            .setMaxLength(25)
            .setRequired(true)
            .setStyle("SHORT")
             var t5 = new TextInputComponent()
            .setCustomId('snh')
            .setLabel('سنه الميلاد')
            .setMaxLength(2)
                 .setPlaceholder("2009-7-27")
            .setMaxLength(25)
            .setRequired(true)
            .setStyle("SHORT")
            var t3 = new TextInputComponent()
            .setCustomId('url')
            .setLabel('رابط لصوره الكركتر في قراند')
            .setMaxLength(2)
                 .setPlaceholder("https://cdn.discord.app/")
            .setMaxLength(2000)
            .setRequired(true)
            .setStyle("PARAGRAPH")
           
        const p1 = new MessageActionRow().addComponents(t1)
             
            
              const p4 = new MessageActionRow().addComponents(t4)
              const p5 = new MessageActionRow().addComponents(t5)
              const p6 = new MessageActionRow().addComponents(t2)
              const p7 = new MessageActionRow().addComponents(t3)
           
            const modal = new Modal()
            .setTitle('إنشاء هوية')
            .setCustomId("h1")
           modal.addComponents(p1,p4,p5,p6,p7)
           if(interaction.replied) return console.log("-")
           await inter.showModal(modal)
          
 
        }
    }
})

const haw = require("./../models/haw")
const {haw3,a7oal} = require('./../config.json')
const { Database } = require("npm.db")
const db = new Database("database.json")
client.on("interactionCreate", async(inter) => {
   
    if(!inter.isModalSubmit()) return;
   if(inter.replied) return console.log("-")
    if(inter.customId == "h1") {
db.add(`haw${inter.guild.id}`, 1)
         const name = inter.fields.getTextInputValue("asm")
         const p1 = db.get(`haw${inter.guild.id}`)
         const my = inter.fields.getTextInputValue("mylad")
        const snh = inter.fields.getTextInputValue("snh")
        const sex = inter.fields.getTextInputValue("sex")
        const url = inter.fields.getTextInputValue("url")
      
       haw.findOne({user: inter.user.id}, async(err,data)=> {
           if(err) throw err;
           if(data) {
             
              inter.reply({
                  content: `لديك هويه سابقه`,
                  ephemeral: true
              })
           } else {
                haw.create({
                  name: name,
                  haw: p1,
                  mylad: my,
                  snh: snh,
                  url: url,
                  sex: sex,
                  user: inter.user.id,
                  guildId: inter.guild.id,
                  condition: "قيد قبول الهويه"
              }).then(() => {
                  inter.reply({content: `تم انشاء هويه بنجاح | شكرا لصبرك.`, ephemeral: true})
                const ch = inter.client.channels.cache.get(haw3) 
                 
                  const button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("17")
                    .setStyle("SUCCESS")
                    .setLabel("قبول"),
                    new MessageButton()
                    .setCustomId("18")
                    .setStyle("DANGER")
                    .setLabel("رفض")

                  )
                 
                  ch.send({
                      embeds: [
                          new MessageEmbed()
                          .setThumbnail(inter.user.displayAvatarURL())
                          .setTitle(`**Create a national identity | إنشاء هوية وطنية**`)
                          .addFields(
                              {name: "**منشن للشخص** :", value: `${inter.user}`},
                              {name: "**اسم للشخص** :", value: `${name}`},
                              {name: "**هويه للشخص** :", value: `${p1}`},
                              {name: "**الولايه** :", value: `${my}`},
                              {name: "**يوم ميلاد للشخص** :", value: `${snh}`},
                              {name: "**الجنس** :", value: `${sex}`}
                          )
                          .setImage(url)
                          .setFooter({ text: inter.user.id })
                          .setColor("WHITE")
                      ],
                      components: [button]
                  })


        })
            
           }
       })
     
    }
   
      }

         )
         client.on("interactionCreate", async(i) => {
const inter = i;
            if(!i.isButton()) return;
            if(i.customId == "17") {
                if(!i.member.roles.cache.has(a7oal)) return;
                const getIdFromFooter = i.message.embeds[0].footer.text;
                const getMember = await i.guild.members.fetch(getIdFromFooter);
             
                data = haw.findOne({user : getMember.id })
                if(!data) return i.reply({
                    content: "لم اجد هذه الهويه في قاعده البيانات | :x:",
                    ephemeral: false
                })
                if(data) {
                await  data.updateOne({condition: "تم قبول الهويه"})
                    i.update({
                        embeds: [ 
                            new MessageEmbed()
                            .setTitle(`تم قبول الهويه`)
                            .setColor("GREEN")
                            .setDescription(`
> - تم قبول الهويه من : ${i.user}
> - الشخص الذي قبلت هويته : ${getMember}
                            `)
                        ], 
                        components: [
                            new MessageActionRow().addComponents(
                                new MessageButton()
                                .setCustomId("2768")
                                .setLabel("الهويه مقبوله")
                                .setStyle("SUCCESS")
                                .setDisabled(true)
                            )
                           
                        ]
                    })
                    getMember.send({
embeds: [
new MessageEmbed()
.setTitle("اشعار جديد")
    .setDescription(`تم قبول هويتك في الاحوال المدنيه وبامكانك التجول بها داخل المدينه ، ونشكرك على صبرك`)
.setColor("BLUE")
], 
components :[
     new MessageActionRow().addComponents(
                                    new MessageButton()
                                    .setCustomId("2368")
                                    .setLabel(inter.guild.name)
                                    .setStyle("SUCCESS")
                                    .setDisabled(true)
                                )
]
                    })
                }
            }
            if(i.customId == "18") {
               if(!i.member.roles.cache.has(a7oal)) return;
                const getIdFromFooter = i.message.embeds[0].footer.text;
                const getMember = await i.guild.members.fetch(getIdFromFooter);
                db.substr(`haw${i.guild.id}`, 1)

                 haw.findOneAndDelete({user: getMember.id},async(err,data) => {
                    if(err) throw err;
                    if(data) {
                        getMember.send({content: "تم رفض هويتك لاسباب معينه عدم الالتزام بها | :x:"})
                        i.update({
                            embeds: [ 
                                new MessageEmbed()
                                .setTitle(`تم رفض الهويه`)
                                .setColor("RED")
                                .setDescription(`
    > - : تم رفض هويته من : ${i.user}
    > - الشخص الذي رفضت هويته : ${getMember}
                                `)
                            ], 
                            components: [
                                new MessageActionRow().addComponents(
                                    new MessageButton()
                                    .setCustomId("2368")
                                    .setLabel("الهويه مرفوضه")
                                    .setStyle("DANGER")
                                    .setDisabled(true)
                                )
                               
                            ]
                        })
                          getMember.send({
embeds: [
new MessageEmbed()
.setTitle("اشعار جديد")
    .setDescription(`هويتك مرفوضه لدى الاحوال المدنيه ؛ لعد الالتزام بالقوانين`)
.setColor("RED")
], 
components :[
     new MessageActionRow().addComponents(
                                    new MessageButton()
                                    .setCustomId("2368")
                                    .setLabel(inter.guild.name)
                                    .setStyle("DANGER")
                                    .setDisabled(true)
                                )
]
                    })
                    }
                })
            }
                })