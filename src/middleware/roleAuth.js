const { verifyToken } = require('../helpers/generateToken');
const userModel = require('../models/user.model');
const roleModel = require("../models/role.model");

const checkRoleAuth = (allowedRoles) => async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ').pop(); // Obtener el token desde el encabezado de autorización
      const tokenData = await verifyToken(token); // Verificar el token y obtener los datos del usuario

      console.log("datos del tokenData", tokenData);

      if (!tokenData) {
         // Si el token no es válido o caducado, devolver un error
         res.status(401).json({ error: 'Token inválido o caducado.' });
         return;
      }

      const userData = await userModel.find({ tenantId })
         .populate({ path: "roleId", model: roleModel })

      if (!userData) {
         res.status(404).json({ error: 'Usuario no encontrado' }); //Si no se encuentra el usuario, devolver un error
         return;
      }

      if (userData.rol && allowedRoles.includes(userData.rol.nombre)) { //Verificar si el rol del usuario está permitido
         next();
      }
      else {
         const rolActual = userData.rol && userData.rol.nombre ? userData.rol.nombre : 'no asignado';
         res.status(403).json({ error: `No tienes permisos para acceder a esta ruta. Rol actual: ${rolActual}` });
      }
   }
   catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' });
   }
}

module.exports = checkRoleAuth;
