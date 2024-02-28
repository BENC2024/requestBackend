const { 
   listCompany,
   detailCompany,
   saveCompany,
   updateCompany,
   deleteCompany
} = require("../services/company.service")

const companyController = {} 

companyController.getCompany = async (req,res) => { 
   try {
      const listComp = await listCompany();
      responseStructure.status = 200;
      responseStructure.message = "Empresas encontradas exitosamente";
      responseStructure.data = listComp;
      res.status(200).json(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al obtener empresas";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

companyController.findCompany = async (req,res) => {
   try {
      const companyId = req.params.id;
      const company = await detailCompany(companyId)
      responseStructure.status = 200;
      responseStructure.message = "Empresa encontrada exitosamente";
      responseStructure.data = company;
      res.status(200).json(responseStructure);
   }
   catch (error) {
      responseStructure.status = 404;
      responseStructure.message = "Empresa no encontrada";
      responseStructure.data = error.message;
      res.status(404).json(responseStructure);
   }
}

companyController.postCompany = async (req, res) => {
   try {
      const newCompany = req.body
      const saveComp = await saveCompany(newCompany);
      responseStructure.status = 200;
      responseStructure.message = "Empresa guardada exitosamente";
      responseStructure.data = saveComp;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      const status = error.name === "ValidationError" ? 400 : 500;
      responseStructure.status = status;
      responseStructure.message = "Error al guardar la empresa";
      responseStructure.data = error.message
      res.status(status).json(responseStructure)
   }
}

companyController.deleteCompanyId = async (req, res) => {
   try {
      const companyId = req.params.id
      const deleteComp = await deleteCompany(companyId);
      responseStructure.status = 200;
      responseStructure.message = "Empresa eliminada exitosamente";
      responseStructure.data = deleteComp;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al eliminar empresa";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

companyController.modifiedCompany = async (req, res) => {
   try {
      const dataCompany = req.body;
      const companyId = req.params.id;
      const modifiedComp = await updateCompany(companyId,dataCompany);
      responseStructure.status = 200;
      responseStructure.message = "Empresa modificada exitosamente";
      responseStructure.data = modifiedComp;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 400;
      responseStructure.message = "Error al modificar la empresa";
      responseStructure.data = error.message;
      res.status(400).json(responseStructure);
   }
}

module.exports = companyController