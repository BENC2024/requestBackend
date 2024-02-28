const { Schema, model } = require("mongoose")

const RequestSchema = new Schema(
   {
      tenantId: {
         type: String,
         required: true,
      },
      requestId: {
         type: Number,
         required: true,
         autoIncrement: true,
      },
      thirdPartiesId: {
         type: Schema.Types.ObjectId,
         ref: 'thirdparties', 
         required: [true, 'El tercero es requerido'],
      },
      userId: {
         type: Schema.Types.ObjectId,
         required: [true,'Usuario requerido']
      },
      categoryId: {
         type: Schema.Types.ObjectId,
         ref: "category",
         required: [true, "La categoría es requerida"],
      },
      statusId: { 
         type: Schema.Types.ObjectId,
         ref: "status",
         required: [true, "El estado de la solicitud es requerido"]
         //default: '65b474a5999f90ef862d978c'
      },
      description: {
         type: String,
         required: [true, "la descripcion es requerida"],
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "El detalle debe ser una cadena de texto",
         },
         minlength: [10, "La descripcion debe tener al menos 10 caracteres"],
         maxlength: [200, "La descripcion no debe tener más de 200 caracteres"],
      },
      amount: {
         type: Number,
         required: [true, "El valor es requerido"],
         validate: {
            validator: (value) => {
               return typeof value === "number";
            },
            message: "El valor debe ser un valor numerico",
         },
         min: [1000, "El precio debe ser superior a mil pesos"],
         max: [100000, "El precio debe ser inferior a cien mil pesos"],
      },
      date: {
         type: Date,
         required: [true, "La fecha es requerida"],
         validate: {
            validator: (value) => {
               return value instanceof Date;
            },
            message: "La fecha debe ser una cadena de tipo Date",
         },
      },
      invoice: { 
         type: String 
      }
   })

module.exports = model("requests", RequestSchema, "Requests")