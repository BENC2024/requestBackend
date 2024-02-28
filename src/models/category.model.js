const { Schema, model } = require("mongoose")

const CategorySchema = new Schema(
   {
      tenantId: {
         type: String,
         required: true
      },
      nameCategory: {
         type: String,
         required: [true, 'Obligatorio agregar categoría'],
         unique: true,
         minlength: [3, "El nombre debe tener al menos 3 caracteres"],
         maxlength: [50, "El nombre no debe exceder los 50 caracteres"],
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "El nombre de la categoria debe ser una cadena de texto",
         }
      },
      global: {
         type: Boolean,
         default: false,
      }
   })
//Nombre String, Nombre del model, Nombre de la coleccion en mongo
module.exports = model("category", CategorySchema, "Category")