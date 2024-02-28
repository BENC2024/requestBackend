const { 
   listUser,
   detailUser,
   saveUser,
   deleteUser,
   updateUser
} = require("../services/user.service")

const userController = {}

userController.getUser = async (req,res) => { 
   try {
      const tenantId = req.tenantId;
      const listThird = await listUser(tenantId)
      responseStructure.status = 200;
      responseStructure.message = "usuarios encontrados exitosamente";
      responseStructure.data = listThird;
      res.status(200).json(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al obtener usuarios";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

userController.findUser = async (req,res) => {
   try {
      const userId = req.params.id;
      const tenantId = req.tenantId;
      const user = await detailUser(userId, tenantId)
      responseStructure.status = 200
      responseStructure.message = "usuario encontrado exitosamente";
      responseStructure.data = user
      res.status(200).json(responseStructure)
   }
   catch (error) {
      responseStructure.status = 404;
      responseStructure.message = "usuario no encontrado";
      responseStructure.data = error.message
      res.status(404).json(responseStructure)
   }
}

userController.postUser = async (req, res) => {
   try {
      const newuser = req.body
      const tenantId = req.tenantId;
      const saveThird = await saveUser(newuser, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "usuario guardada exitosamente";
      responseStructure.data = saveThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      responseStructure.status = status;
      responseStructure.message = "Error al guardar usuario";
      responseStructure.data = error.message
      res.status(status).json(responseStructure)
   }
}

userController.deleteUserId = async (req, res) => {
   try {
      const userId = req.params.id
      const tenantId = req.tenantId;
      const deleteThird = await deleteUser(userId, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "usuario eliminado exitosamente";
      responseStructure.data = deleteThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al eliminar usuario";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

userController.modifiedUser = async (req, res) => {
   try {
      const datauser = req.body;
      const userId = req.params.id;
      const token = req.headers.authorization;
      const tenantId = req.tenantId;
      const modifiedThird = await updateUser(userId, token, datauser);
      responseStructure.status = 200;
      responseStructure.message = "usuario modificado exitosamente";
      responseStructure.data = modifiedThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 400;
      responseStructure.message = "Error al modificar la usuario";
      responseStructure.data = error.message;
      res.status(400).json(responseStructure);
   }
}

module.exports = userController