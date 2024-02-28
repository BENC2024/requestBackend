//Proceso de configuracion de las rutas

const { Router } = require("express"); //Funcion especifica de express
const routes = Router() //Funcion routes de express

const { 
   getUser,
   findUser,
   postUser,
   deleteUserId,
   modifiedUser
} = require("../controllers/user.controller") 

// const{ logout } = require("../controller/login.controller")
const verifyTokenMiddleware = require('../middleware/validateTokenMiddleware');
const checkRoleAuth = require('../middleware/roleAuth');

routes.get("/", (req, res) => {
   res.send("LittleBox");
});

routes.get("/listUser", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador']), getUser);
routes.get("/detailUser/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), findUser);
//routes.post("/saveUser", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), postUser);
routes.delete("/deleteUser/:id", verifyTokenMiddleware, checkRoleAuth(['gerente']), deleteUserId);
routes.put("/updateUser/:id",verifyTokenMiddleware,checkRoleAuth(['gerente']), modifiedUser);

module.exports = routes // exportar las rutas