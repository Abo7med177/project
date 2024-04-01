const { Schema, model } = require("mongoose");
module.exports = model("login", new Schema({
  m3lomat: String,
  userId: String
})
                      )