const thirdPartiesModel = require("../models/thirdParties.model");

const listThirdParties = async (tenantId) => {
   try {
      const thirdPartiesModelExist = await thirdPartiesModel.exists({ tenantId });
      if (!thirdPartiesModelExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const thirdPartiesModels = await thirdPartiesModel.find({ tenantId });
      return thirdPartiesModels;
   }
   catch (error) {
      throw new Error(`Error al obtener las empresas: ${error.message}`);
   }
}

const detailThirdParties = async (id, tenantId) => {
   try {
      const thirdPartiesModelExist = await thirdPartiesModel.findOne({ _id: id, tenantId });
      if (!thirdPartiesModelExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const thirdPartiesModel = await thirdPartiesModel.findById({ _id: id, tenantId });
      return thirdPartiesModel
   }
   catch (error) {
      if (error.name === 'CastError' && error.path === '_id') {
         throw new Error("_id proporcionado no es válido o no se encontro en la base de datos");
      }
      else {
         throw error;
      }
   }
}

const saveThirdParties = async (thirdParties, tenantId) => {
   try {
      thirdParties.tenantId = tenantId;
      if (!thirdParties || !thirdParties.nameThirdParties || !thirdParties.documentThirdParties) {
         throw new Error("El objeto thirdParties no es valido o no contiene campos requeridos");
      }
      const saveThird = new thirdPartiesModel(thirdPartiesModel);
      const saveT = await saveThird.save();
      return saveT;
   }
   catch (error) {
      throw new Error(`Error al guardar el thirdPartiesModel: ${error.message}`);
   }
}

const deleteThirdParties = async (id, tenantId) => {
   try {
      const thirdPartiesModelExist = await thirdPartiesModel.findOne({ _id: id, tenantId });
      if (!thirdPartiesModelExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const deleteThird = await thirdPartiesModel.findOneAndDelete({ _id: id, tenantId });
      return deleteThird
   }
   catch (error) {
      if (error.name === 'CastError' && error.path === '_id') {
         throw new Error("_id proporcionado no es válido o no se encontro en la base de datos");
      }
      else {
         throw error;
      }
   }
}

const updateThirdParties = async (id, updateThird, tenantId) => {
   try {
      const thirdPartiesModelExist = await thirdPartiesModel.findOne({ _id: id, tenantId });
      if (!thirdPartiesModelExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const updateT =  await thirdPartiesModel.findOneAndUpdate(
         { _id: id, tenantId },
         updateThird,
         { new: true }
      )
      if (!updateT) {
         throw new Error("thirdPartiesModel no encontrado");
      }
      return updateT;
   }
   catch (error) {
      if (error.name === 'CastError' && error.path === '_id') {
         throw new Error("_id proporcionado no es válido o no se encontro en la base de datos");
      }
      else {
         throw error; // Propaga el error para que sea manejado en el controlador
      }
   }
}

module.exports = {
   listThirdParties,
   detailThirdParties,
   saveThirdParties,
   deleteThirdParties,
   updateThirdParties,
};
