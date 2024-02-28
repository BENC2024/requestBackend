const requestModel = require("../models/request.model")
const categoryModel = require("../models/category.model");
const statusModel = require("../models/status.model")
const thirdPartiesModel = require("../models/thirdParties.model");

const listRequest = async (tenantId) => {
   try {
      const requestExist = await requestModel.exists({ tenantId });
      if (!requestExist) {
         throw new Error("TenantId proporcionado no es válido o no se encuentra en la base de datos");
      }
      const listReq = await requestModel.find({ tenantId })
         .populate({path: "categoryId", model: categoryModel})
         .populate({path: "thirdPartiesId", model: thirdPartiesModel})
         .populate({path: "statusId", model: statusModel})
         .populate({path: "userId", model: statusModel})
      return listReq;
   }
   catch (error) {
      throw error;
   }
}

const detailRequest = async (id, tenantId) => {
   try {
      const requestExist = await requestModel.findOne({ _id: id, tenantId });
      if (!requestExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const detailReq = await requestModel.findById({ _id: id, tenantId })
         .populate({path: "categoryId", model: categoryModel})
         .populate({path: "thirdPartiesId", model: thirdPartiesModel})
         .populate({path: "statusId", model: statusModel})
         .populate({path: "userId", model: statusModel})
      return detailReq
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

const saveRequest = async (newRequest, tenantId) => {
   newRequest.tenantId = tenantId;
   if (!newRequest || !newRequest.description || !newRequest.amount) {
      throw new Error("El objeto solicitud no es valido o no contiene campos requeridos");
   }
   const newReq = new requestModel(newRequest);
   const saveReq = await newReq.save();
   return saveReq;
}

const deleteRequest = async (id, tenantId) => {
   try {
      const requestExist = await requestModel.findOne({ _id: id, tenantId });
      if (!requestExist) {
         throw new Error("TenantId proporcionado no coincide con ninguna Solicitud en la base de datos");
      }
      const deleteReq = await requestModel.findOneAndDelete({ _id: id, tenantId })
      return deleteReq
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

const updateRequest = async (id, nuevosDatos, tenantId) => {
   try {
      const requestExist = await requestModel.findById({ _id: id, tenantId})
         .populate({path: "categoryId", model: categoryModel})
         .populate({path: "thirdPartiesId", model: thirdPartiesModel})
         .populate({path: "statusId", model: statusModel})
         .populate({path: "userId", model: statusModel})
      console.log("solicitud existente cambio ", requestExist)

      if (!requestExist || requestExist.tenantId !== tenantId) {
         throw new Error("TenantId proporcionado no existe o no coincide con _id de la solicitud a modificar");
      }

      const status = requestExist.statusId?.nameStatus;
      if (status === 'finalizado' || status === 'rechazado') {
         throw new Error(`La solicitud está ${status} y no se puede modificar`);
      } 

      const updateReq = await requestsModel.findByIdAndUpdate(
         id,
         nuevosDatos,
         { new: true } )
         .populate({path: "categoryId", model: categoryModel})
         .populate({path: "thirdPartiesId", model: thirdPartiesModel})
         .populate({path: "statusId", model: statusModel})
         .populate({path: "userId", model: statusModel})

      if (!updateReq) {
         throw new Error("Solicitud no encontrada");
      }
      return updateReq;
   }
   catch (error) {
      if (error.name === 'CastError' && error.path === '_id') {
         throw new Error("_id proporcionado no es válido o no se encontró en la base de datos");
      } else {
         throw error;
      }
   }
}

const updateRequestStatus = async (id, nuevoEstadoId, tenantId) => {
   try {
      const requestExist = await Solicitud.findOne({ _id: solicitudId, tenantId })
         .populate({path: "categoryId", model: categoryModel})
         .populate({path: "thirdPartiesId", model: thirdPartiesModel})
         .populate({path: "statusId", model: statusModel})
         .populate({path: "userId", model: statusModel})
      console.log("solicitud existente", requestExist);
   
      if (!requestExist) {
         throw new Error('Solicitud no encontrada');
      }

      const nameStatus = requestExist.statusId.nameStatus;
      console.log("nombre del estado", nameStatus);
      if (nameStatus === 'finalizado' || nameStatus === 'denegado') {
         throw new Error('La solicitud ya ha sido procesada, no se puede cambiar el estado finalizado');
      }
      requestExist.statusId = nuevoEstadoId;
      const updateRequest = await requestExist.save();
      console.log("este es el nuevo id del estado de la solicitud ", updateRequest.statusId._id, "este es el nuevoEstadoId pasado como parametro: ", nuevoEstadoId);
      return updateRequest;
   } 
   catch (error) {
      if (error.name === 'CastError' && error.path === '_id') {
         throw new Error("_id proporcionado no es válido o no se encontró en la base de datos");
      } 
      else {
         throw error;
      }
   }
}

module.exports = {
   listRequest,
   detailRequest,
   saveRequest,
   deleteRequest,
   updateRequest,
   updateRequestStatus
}

