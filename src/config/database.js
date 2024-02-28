
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/RequestsLittleBox")
   .then(() => {
      console.log("Conexion existosa de la base de datos");
   })
   .catch((e) => {
      console.log("No se pudo conectar a la base de datos: " + e);
   });
