//Proceso de configuracion de las rutas

const { Router } = require("express"); //Funcion especifica de express
const routes = Router() //Funcion routes de express

const { 
   getRequest,
   findRequest,
   postRequest,
   deleteRequestId,
   modifiedRequest,
   modifiedRequestStatus
} = require("../controllers/request.controller") 

// const{ logout } = require("../controller/login.controller")
const verifyTokenMiddleware = require('../middleware/validateTokenMiddleware');
const checkRoleAuth = require('../middleware/roleAuth');

routes.get("/", (req, res) => {
   res.send("LittleBox");
})

routes.get("/listRequest", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), getRequest);
routes.get("/detailRequest/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), findRequest);
routes.post("/saveRequest", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), postRequest);
routes.delete("/deleteRequest/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador']), deleteRequestId);
routes.put("/updateRequest/:id",verifyTokenMiddleware,checkRoleAuth(['gerente', 'administrador']), modifiedRequest);
routes.put("/updateRequestStatus/:id",verifyTokenMiddleware,checkRoleAuth(['gerente', 'administrador']), modifiedRequestStatus);

module.exports = routes // exportar las rutas