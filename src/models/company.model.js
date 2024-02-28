const { Schema, model } = require("mongoose")

const CompanySchema = new Schema(
   {
      tenantId: {
         type: String,
         required: [true, "NIT requerido"],
         validator: (value) => {
            return typeof value === "string";
         },
         message: "El nombre de la categoria debe ser una cadena de texto",
      },
      balanceId: {
         type: Schema.Types.ObjectId,
         ref: "balance", //SE ASOCIA AL NOMBRE DEL MODELO
      },
      nameCompany: {
         type: String,
         required: [true, "Nombre de la empresa es requerido"],
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "El nombre de la empresa debe ser una cadena de texto",
         },
      },
      addressCompany: {
         type: String,
         required: [true, "Direccion es requerido"],
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "Direccion debe ser una cadena de texto",
         },
      },
      phoneCompany: {
         type: String,
         required: [true, "Telefono de la empresa es requerido"],
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "El telefono de la empresa debe ser una cadena de texto",
         },
      },
      emailCompany: {
         type: String,
         required: [true, "Nombre de la empresa es requerido"],
         validate: {
            validator: (value) => {
               return typeof value === "string";
            },
            message: "El nombre de la empresa debe ser una cadena de texto",
         },
      },
   })

module.exports = model("company", CompanySchema, "Company")
