const { Schema, model } = require("mongoose")

const RoleSchema = new Schema(
   {
      nameRole: { 
         type: String,
         required: [true, 'Obligatorio agregar rol'],
         unique: true
         //enum: [..'Administrador', 'Colaborador'],
      }
   })

module.exports = model("role", RoleSchema, "Role")
