const client = require("./../index")
const { MessageEmbed, Modal, TextInputComponent, MessageActionRow } = require("discord.js")
const { Database } = require("npm.db")
const db = new Database("database.json")
client.on("interactionCreate", async i => { 
    if(!i.isButton()) return;
    if(i.customId == "new") { 
        if(!i.member.roles.cache.has("1117868299263422584")) return;
        const m1 = new TextInputComponent()
        .setCustomId("id")
 .setPlaceholder("Id Sony")
 .setStyle("SHORT")
 .setLabel("ايدي كابتن الرحله ؟")
 .setRequired(true)
 .setMaxLength(30)
 const m2 = new TextInputComponent()
 .setCustomId("id1")
 .setPlaceholder("Id Sony")
 .setStyle("SHORT")
 .setLabel("ايدي مساعد كابتن الرحلة ؟")
 .setRequired(true)
 .setMaxLength(30)
const m3 = new TextInputComponent()
.setCustomId("time")
.setPlaceholder("time")
.setStyle("SHORT")
.setLabel("وقت الرحلة ؟")
.setRequired(true)
.setMaxLength(5)
const m4 = new TextInputComponent()
.setCustomId("time1")
.setPlaceholder("time")
.setStyle("SHORT")
.setLabel("وقت الارسال ؟")
.setRequired(true)
.setMaxLength(5)
const m5 = new TextInputComponent()
.setCustomId("time2")
.setPlaceholder("time")
.setStyle("SHORT")
.setLabel("وقت الاقلاع ؟")
.setRequired(true)
.setMaxLength(5)
const t1 = new MessageActionRow().addComponents(m1)
const t2 = new MessageActionRow().addComponents(m2)
const t3 = new MessageActionRow().addComponents(m3)
const t4 = new MessageActionRow().addComponents(m4)
const t5 = new MessageActionRow().addComponents(m5)
const modal = new Modal()
.setTitle("فتح رحله")
.setCustomId("open")
modal.addComponents(t1,t2,t3,t4,t5)
i.showModal(modal)
    }
    if(i.customId == "plane") { 
        if(!i.member.roles.cache.has("1117868299263422584")) return;
        const m1 = new TextInputComponent()
        .setCustomId("id2")
 .setPlaceholder("Id Sony")
 .setStyle("SHORT")
 .setLabel("ايدي كابتن الرحله ؟")
 .setRequired(true)
 .setMaxLength(30)
 const m2 = new TextInputComponent()
 .setCustomId("id3")
 .setPlaceholder("Id Sony")
 .setStyle("SHORT")
 .setLabel("ايدي مساعد كابتن الرحلة ؟")
 .setRequired(true)
 .setMaxLength(30)
 const m3 = new TextInputComponent()
 .setCustomId("rkab")
 .setPlaceholder("Numnber")
 .setStyle("SHORT")
 .setLabel("عدد ركاب الطائره ؟")
 .setRequired(true)
 .setMaxLength(2)
 const m4 = new TextInputComponent()
 .setCustomId("time3")
 .setPlaceholder("00:00")
 .setStyle("SHORT")
 .setLabel("وقت الاقلاع ؟")
 .setRequired(true)
 .setMaxLength(5)
 const m5 = new TextInputComponent()
 .setCustomId("time4")
 .setPlaceholder("00:00")
 .setStyle("SHORT")
 .setLabel("وقت الهبوط ؟")
 .setRequired(true)
 .setMaxLength(5)

const t1 = new MessageActionRow().addComponents(m1)
const t2 = new MessageActionRow().addComponents(m2)
const t3 = new MessageActionRow().addComponents(m3)
const t4 = new MessageActionRow().addComponents(m4)
const t5 = new MessageActionRow().addComponents(m5)
const modal = new Modal()
.setTitle("تاكيد الاقلاع")
.setCustomId("accpet")
modal.addComponents(t1,t2,t3,t4,t5)
i.showModal(modal)
    }
    
})
client.on("interactionCreate", async i => { 
    if(!i.isModalSubmit) return;
    const ch = i.guild.channels.cache.get("1118193064796770364")
    if(i.customId == "open") { 

        const id = i.fields.getTextInputValue("id")
        const id1 = i.fields.getTextInputValue("id1")
        const time = i.fields.getTextInputValue("time")
        const time1 = i.fields.getTextInputValue("time1")
        const time2 = i.fields.getTextInputValue("time2")
        db.add(`plane${i.guild.id}`, 1)
ch.send({
content: `**__  إعـلان رحـلـة / قولدن شيلد


 ايـدي كاتبن الرحلة  | ${id}

 ايدي الطاقم المساعد | ${id1} 


رقم الـرحـلـة | ${db.get(`plane${i.guild.id}`)}

وقـت الـرحـلة | ${time}

وقـت الارسال | ${time1}

وقـت الاقــلاع | ${time2}


[ في حال ماعرفت كيف تدخل القيم توجه الى <#1118197856474505216> ]
__**
@everyone`
})
await i.reply({content: "تم بدا الرحله بنجاح | <:GOLDEN83:1134936709205864458> ",ephemeral: true})
    }  else if(i.customId == "accpet") {
        const id = i.fields.getTextInputValue("id2")
        const id1 = i.fields.getTextInputValue("id3")
        const rkab = i.fields.getTextInputValue("rkab")
        const time1 = i.fields.getTextInputValue("time3")
        const time2 = i.fields.getTextInputValue("time4")
        ch.send({
            content: `__**
            ننبهكم
            
            أعزائنا المواطنين بحمدالله تم إقلاع الطائره الى دولة قولدن شيلد .
            
            مع كابتن الرحله : ${id}
            
            
            بإشراف الطاقم المخصص من الدولة: ${id1}
            
            -
            
            -
            
            -
            
            رقـم الـرحلـة : ${db.get(`plane${i.guild.id}`)}
            
            
             
                 الركاب المتواجدين في الطائرة  : ${rkab}
            
            وقت الاقلاع : ${time1}
            
            وقت الهبوط : ${time2}
            ( مـلاحـظات مـهـمـة )
            
            ( 1 ) – فـي حـال مـواجهـتك لمـشكلـة قـم بالأتـصال بالـجـمس الاسود .
            
            ( 2 ) – يرجـى مراجـعة القوانين لتجنـب مخـالفـتـك .
            
            ( 3 ) – عـدم الـتخريـب فـي حـال وجود مـخـرب .
            
            – رحـلـة سعـيدة في دولـة 𝖦𝗈𝗅𝖽𝖾𝗇 𝖲𝗁𝗂𝗅𝖽 .
            
            @everyone
            
            **__`
        })
        await i.reply({content: "تم تأكيد الاقلاع بنجاح واعطائم نقطه اقيام  | <:GOLDEN83:1134936709205864458> ",ephemeral: true})
db.add(`point-game${i.user.id}`, 1)
    }
})