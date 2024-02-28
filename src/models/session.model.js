const { Schema, model } = require("mongoose")

const SessionSchema = new Schema(
   {
      token: { 
         type: String,
         required: true,
         unique: true
      }
   })

module.exports = model("session", SessionSchema, "Session")
