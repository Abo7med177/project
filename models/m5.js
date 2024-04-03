 const { model, Schema } = require("mongoose");
module.exports = model("shoping", new Schema({
    userId: String, 
  offer: String,
    guildId: String,
    idoffer: Number,
    timestamp: Number,
    s3r: Number,
    userm: String
    
})
                      )