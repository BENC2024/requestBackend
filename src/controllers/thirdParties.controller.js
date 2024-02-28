const { 
   listThirdParties,
   detailThirdParties,
   saveThirdParties,
   updateThirdParties,
   deleteThirdParties
} = require("../services/thirdParties.service")

const thirdPartiesController = {} 

thirdPartiesController.getThirdParties = async (req,res) => { 
   try {
      const tenantId = req.tenantId;
      const listThird = await listThirdParties(tenantId)
      responseStructure.status = 200;
      responseStructure.message = "Terceros encontrados exitosamente";
      responseStructure.data = listThird;
      res.status(200).json(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al obtener Terceros";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

thirdPartiesController.findThirdParties = async (req,res) => {
   try {
      const thirdPartiesId = req.params.id;
      const tenantId = req.tenantId;
      const thirdParties = await detailThirdParties(thirdPartiesId, tenantId)
      responseStructure.status = 200
      responseStructure.message = "Tercero encontrado exitosamente";
      responseStructure.data = thirdParties
      res.status(200).json(responseStructure)
   }
   catch (error) {
      responseStructure.status = 404;
      responseStructure.message = "Tercero no encontrado";
      responseStructure.data = error.message
      res.status(404).json(responseStructure)
   }
}

thirdPartiesController.postThirdParties = async (req, res) => {
   try {
      const newThirdParties = req.body
      const tenantId = req.tenantId;
      const saveThird = await saveThirdParties(newThirdParties, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "Tercero guardada exitosamente";
      responseStructure.data = saveThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      responseStructure.status = status;
      responseStructure.message = "Error al guardar Tercero";
      responseStructure.data = error.message
      res.status(status).json(responseStructure)
   }
}

thirdPartiesController.deleteThirdPartiesId = async (req, res) => {
   try {
      const thirdPartiesId = req.params.id
      const tenantId = req.tenantId;
      const deleteThird = await deleteThirdParties(thirdPartiesId, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "Tercero eliminado exitosamente";
      responseStructure.data = deleteThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al eliminar Tercero";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

thirdPartiesController.modifiedThirdParties = async (req, res) => {
   try {
      const dataThirdParties = req.body;
      const thirdPartiesId = req.params.id;
      const tenantId = req.tenantId;
      const modifiedThird = await updateThirdParties(thirdPartiesId, dataThirdParties, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "Tercero modificado exitosamente";
      responseStructure.data = modifiedThird;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 400;
      responseStructure.message = "Error al modificar la Tercero";
      responseStructure.data = error.message;
      res.status(400).json(responseStructure);
   }
}

module.exports = thirdPartiesController