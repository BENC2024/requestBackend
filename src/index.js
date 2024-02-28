
require('./config/database') //Utilizar la configuracion de la base de datos

const server = require("./config/server") 
const handle = server.get('puerto')

server.listen( handle, () => {
   console.log("Conexion existosa del puerto: ",handle);
})
