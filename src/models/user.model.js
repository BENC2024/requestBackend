const { Schema, model, SchemaType } = require("mongoose")

const UserSchema = new Schema(
   {
      tenantId: {
         type: String,
         required: true,
      },
      companyId: {
         type: Schema.Types.ObjectId, 
         ref: "company",
         required: [true,'Falta id empresa']
      },
      roleId: {
         type: Schema.Types.ObjectId,
         required: [true,'Rol Requerido']
      },
      userName: {
         type: String,
         required: [true, "El nombre de usuario es requerido"],
         unique: true,
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "El nombre de la usuario debe ser una cadena de texto"
         },
         minlength: [6, "El nombre de usuario debe tener al menos 6 caracteres"],
         maxlength: [128, "El nombre de usuario no debe tener más de 128 caracteres"],
      },
      password: {
         type: String,
         required: [true, "La contraseña es requerida"],
      },
      name: {
         type: String,
         required: [true, "El nombre es requerido"],
         unique: true,
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "El nombre debe ser una cadena de texto"
         },
         minlength: [3, "El nombre debe tener al menos 3 caracteres"],
         maxlength: [128, "El nombre de usuario no debe tener más de 128 caracteres"],
      },
      emailUser: {
         type: String,
         required: [true, "El correo electrónico es requerido"],
         validator: (value) => {
           return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
         },
         message: "El correo electrónico no es válido",
      },
      imgFirm:{
         type: String,
         required: [true, "La imagen de la firma es requerida"],
      }
   })

module.exports = model("user", UserSchema, "User")