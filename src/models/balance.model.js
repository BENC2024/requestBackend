const { Schema, model } = require("mongoose")

const BalanceSchema = new Schema(
   {
      tenantId: {
         type: String,
         required: true,
      },
      balance: {
         type: Number,
         required: [true, "El saldo es requerido para solicitud de gasto"],
         default: 0,
      }
   })

module.exports = model("balance", BalanceSchema, "Balance");
