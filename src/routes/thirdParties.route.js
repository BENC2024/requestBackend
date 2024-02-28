//Proceso de configuracion de las rutas

const { Router } = require("express"); //Funcion especifica de express
const routes = Router() //Funcion routes de express

const { 
   getThirdParties,
   findThirdParties,
   postThirdParties,
   deleteThirdPartiesId,
   modifiedThirdParties
} = require("../controllers/thirdParties.controller") 

// const{ logout } = require("../controller/login.controller")
const verifyTokenMiddleware = require('../middleware/validateTokenMiddleware');
const checkRoleAuth = require('../middleware/roleAuth');

routes.get("/", (req, res) => {
   res.send("LittleBox");
});

routes.get("/listThirdParties", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), getThirdParties);
routes.get("/detailThirdParties/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), findThirdParties);
routes.post("/saveThirdParties", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), postThirdParties);
routes.delete("/deleteThirdParties/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador']), deleteThirdPartiesId);
routes.put("/updateThirdParties/:id",verifyTokenMiddleware,checkRoleAuth(['gerente', 'administrador']), modifiedThirdParties);

module.exports = routes // exportar las rutas