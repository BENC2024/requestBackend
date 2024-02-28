//Proceso de configuracion de las rutas

const { Router } = require("express"); //Funcion especifica de express
const routes = Router() //Funcion routes de express

const { 
   getCategory,
   findCategory,
   postCategory,
   deleteCategoryId,
   modifiedCategory
} = require("../controllers/category.controller") 

// const{ logout } = require("../controller/login.controller")
const verifyTokenMiddleware = require('../middleware/validateTokenMiddleware');
const checkRoleAuth = require('../middleware/roleAuth');

routes.get("/", (req, res) => {
   res.send("LittleBox");
});

routes.get("/listCategory", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), getCategory);
routes.get("/detailCategory/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), findCategory);
routes.post("/saveCategory", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador', 'colaborador']), postCategory);
routes.delete("/deleteCategory/:id", verifyTokenMiddleware, checkRoleAuth(['gerente', 'administrador']), deleteCategoryId);
routes.put("/updateCategory/:id",verifyTokenMiddleware,checkRoleAuth(['gerente', 'administrador']), modifiedCategory);

module.exports = routes // exportar las rutas