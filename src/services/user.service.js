const userModel = require("../models/user.model")
const companyModel = require("../models/company.model")
const roleModel = require("../models/role.model");
const { verifyToken } = require("../helpers/generateToken")
const bcrypt = require('bcrypt')

const listUser = async (tenantId) => {
   try {
      const usersExist = await userModel.exists({ tenantId });
      if (!usersExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const users = await userModel.find({ tenantId })
         .populate({ path: "companyId", model: companyModel })
         .populate({ path: "roleId", model: roleModel })
      return users
   }
   catch (error) {
      throw new Error(`Error al obtener usuarios: ${error.message}`);;
   }
}

const detailUser = async (id,tenantId) => { 
   try {
      const userExist = await userModel.findOne({ _id: id, tenantId });
  
      if (!userExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const user = await userModel.findById({ _id: id, tenantId })
         .populate({path: "companyId", model: companyModel})
         .populate({path: "roleId", model: roleModel})
      return user
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

const saveUser = async (user, tenantId) => {
   try {
      user.tenantId = tenantId;
      const camposRequeridos = ['name', 'username', 'password', 'rol', 'estado']
      const tieneCamposRequeridos = camposRequeridos.every(campo => user[campo]);
      if (!user || !tieneCamposRequeridos) {
         throw new Error("El objeto user no es válido o no contiene campos requeridos");
      }
      const newUser = new userModel(user);
      const userSave = await newUser.save();
      return userSave;
   }
   catch (error) {
      throw new Error(`Error al guardar el usuario: ${error.message}`);
   }
}

const deleteUser = async (id, tenantId) => {
   try{
      const userExist = await userModel.findOne({ _id: id, tenantId });
      if (!userExist) {
         throw new Error("TenantId proporcionado no es valido o no se encuentra en la base de datos");
      }
      const deleteUser = await userModel.findOneAndDelete({ _id: id, tenantId });
      return deleteUser;
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

const updateUser = async (id, token, nuevosDatos) => {
   try {
      const decodedToken = await verifyToken(token);
      console.log('Datos recibidos:', nuevosDatos);
      if (nuevosDatos.password) {
         nuevosDatos.password = await bcrypt.hash(nuevosDatos.password, 12);
      }
      if (nuevosDatos.emailUser && nuevosDatos.emailUser !== decodedToken.emailUser) {
         return { redirectToLogin: true };
      }
      const updateU = await User.findOneAndUpdate(
         { _id: id, tenantId: decodedToken.tenantId },
         { $set: nuevosDatos },
         { new: true }
      )
      
      if (!updateU) {
         throw new Error("Usuario no encontrado o el tenantId no coincide");
      }
      return { updateU, newToken: null };
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
   listUser,
   detailUser,
   saveUser,
   deleteUser,
   updateUser
}