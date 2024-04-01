const {Schema,model} = require("mongoose");
module.exports = model("haw", new Schema({
    user: String,
        name: String,
    haw: Number,
    mylad: String,
    snh: String,
    time: Number,
    url: String,
    sex: String,
    guildId: String,
    condition: String
})
                       )