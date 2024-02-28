//Proceso de configuracion de las rutas

const { Router } = require("express"); //Funcion especifica de express
const routes = Router() //Funcion routes de express

const { 
   getCompany,
   findCompany,
   postCompany,
   deleteCompanyId,
   modifiedCompany
} = require("../controllers/company.controller") 

// const{ logout } = require("../controller/login.controller")
const verifyTokenMiddleware = require('../middleware/validateTokenMiddleware');
const checkRoleAuth = require('../middleware/roleAuth');

routes.get("/", (req, res) => {
   res.send("LittleBox");
});

routes.get("/listCompany", verifyTokenMiddleware, checkRoleAuth(['SuperUsuario']), getCompany);
routes.get("/detailCompany/:id", verifyTokenMiddleware, checkRoleAuth(['SuperUsuario']), findCompany);
routes.get("/detailCompanyUser/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador']), getCompany);
routes.delete("/deleteCompany/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador']), deleteCompanyId);
routes.put("/updateCompany/:id",verifyTokenMiddleware,checkRoleAuth(['gerente']), modifiedCompany);

module.exports = routes // exportar las rutas