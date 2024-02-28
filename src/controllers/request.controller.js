const { 
   listRequest,
   listRequestUser,
   detailRequest,
   saveRequest,
   deleteRequest,
   updateRequest,
   updateRequestStatus,
} = require("../services/request.service") 

const requestController = {}

requestController.getRequest = async (req,res) => { 
   try {
      const tenantId = req.tenantId;
      const listReq = await listRequest(tenantId)
      responseStructure.status = 200;
      responseStructure.message = "solicitudes encontradas exitosamente";
      responseStructure.data = listReq;
      res.status(200).json(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al obtener solicitudes";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

requestController.findRequest = async (req,res) => {
   try {
      const requestId = req.params.id;
      const tenantId = req.tenantId;
      const request = await detailRequest(requestId, tenantId)
      responseStructure.status = 200
      responseStructure.message = "solicitudes encontrado exitosamente";
      responseStructure.data = request
      res.status(200).json(responseStructure)
   }
   catch (error) {
      responseStructure.status = 404;
      responseStructure.message = "solicitud no encontrada";
      responseStructure.data = error.message
      res.status(404).json(responseStructure)
   }
}

requestController.postRequest = async (req, res) => {
   try {
      const newRequest = req.body
      const tenantId = req.tenantId;
      const saveThird = await saveRequest(newRequest, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "solicitud guardada exitosamente";
      responseStructure.data = saveThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      responseStructure.status = status;
      responseStructure.message = "Error al guardar solicitudes";
      responseStructure.data = error.message
      res.status(status).json(responseStructure)
   }
}

requestController.deleteRequestId = async (req, res) => {
   try {
      const requestId = req.params.id
      const tenantId = req.tenantId;
      const deleteThird = await deleteRequest(requestId, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "solicitud eliminada exitosamente";
      responseStructure.data = deleteThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al eliminar solicitud";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

requestController.modifiedRequest = async (req, res) => {
   try {
      const dataRequest = req.body;
      const requestId = req.params.id;
      const tenantId = req.tenantId;
      const modifiedThird = await updateRequest(requestId, dataRequest, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "solicitud modificada exitosamente";
      responseStructure.data = modifiedThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 400;
      responseStructure.message = "Error al modificar la solicitudes";
      responseStructure.data = error.message;
      res.status(400).json(responseStructure);
   }
}

requestController.modifiedRequestStatus = async (req, res) => {
   try {
      const statusIdNew = req.body.statusId;
      const requestId = req.params.id;
      const tenantId = req.tenantId;
      const modifiedThird = await updateRequestStatus(requestId, statusIdNew, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "solicitud cambio de estado exitosamente";
      responseStructure.data = modifiedThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 400;
      responseStructure.message = "Error al modificar la solicitudes";
      responseStructure.data = error.message;
      res.status(400).json(responseStructure);
   }
}

module.exports = requestController
