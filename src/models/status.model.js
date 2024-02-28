const { Schema, model } = require("mongoose")

const StatusSchema = new Schema(
   {
      nameStatus: { 
         type: String,
         required: true,
         unique: true,
         //enum: ['Aprobado', 'Denegado', 'Pendiente', 'En proceso'],
      }
   })

module.exports = model("status", StatusSchema, "Status")