const companyModel = require("../models/company.model")
const balanceModel = require("../models/balance.model")

const listCompany = async () => {
   console.log("En el listado de empresas")
   try {
      const listComp = await companyModel.find()
         .populate({path: "balanceId", model: balanceModel})
      return listComp
   }
   catch (error) {
      throw new Error(`Error al obtener las empresas: ${error.message}`);
   }
}

const detailCompany = async (tenantId) => {
   try {
      console.log("En el listado de categorias")
      const comp = await companyModel.findOne(tenantId)
         .populate({path: "balanceId", model: balanceModel})
      return comp
   }
   catch(error){
      throw new Error(`Error al obtener empresa: ${error.message}`);
   }
}

const saveCompany = async (company) => {
   try {
      const comp = new companyModel(company)
      const saveComp = await comp.save()
      return saveComp;
   }
   catch (error) {
      throw new Error(`Error al guardar la empresa: ${error.message}`);
   }
}

const updateCompany = async (tenantId,company) => {
   try {
      const updateComp = await companyModel.findOneAndUpdate(
         tenantId,
         { $set: company },
         { new: true })
         .populate({path: "balanceId", model: balanceModel})
      return updateComp;
   }
   catch (error) {
      throw new Error(`Error al actualizar la empresa por ID: ${error.message}`);
   }
}

const deleteCompany = async (tenantId) => {
   try {
      const company = await Empresa.findOne(tenantId)
      if (!company) {
         throw new Error("Empresa no encontrada");
      }
      return await company.findOneAndDelete(tenantId);
   } 
   catch (error) {
      throw new Error(`Error al eliminar la empresa: ${error.message}`);
   }
}

module.exports = { 
   listCompany,
   detailCompany,
   saveCompany,
   updateCompany,
   deleteCompany
}
