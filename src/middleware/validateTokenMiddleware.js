const jwt = require('jsonwebtoken');
const responseStructure = require('../helpers/responseStructure');

const verifyTokenMiddleware = async (req, res, next) => {
   try {
      // Verificamos si la ruta es /logout
      if (req.url !== "/logout") {
         const token = req.headers.authorization;
         if (!token) {
            responseStructure.status = 401;
            responseStructure.message = "Error: Token no proporcionado";
            responseStructure.data = null;
            return res.status(401).json(responseStructure);
         }
         // Verificamos si el token es válido
         const decodedToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
         if (!decodedToken) {
            responseStructure.status = 401;
            responseStructure.message = "Error: Token no válido";
            responseStructure.data = null;
            return res.status(401).json(responseStructure);
         }
         const userId = decodedToken.userId;
         req.tenantId = decodedToken.tenantId; // Adjuntar el tenantId al objeto de solicitud

         if (req.url !== "/logout") { // Si no estamos en la ruta /logout, no eliminamos el token de la sesión
            req.session.token = decodedToken;
         }
         next();
      }
      else {
         // Permitimos el acceso a la ruta /logout para todos los usuarios
         next();
      }
   }
   catch (error) {
      console.error(error);
      responseStructure.status = 500;
      responseStructure.message = `Error en validarTokenMiddleware: ${error.message}`;
      responseStructure.data = null;
      res.status(500).json(responseStructure);
   }
}

module.exports = verifyTokenMiddleware;


