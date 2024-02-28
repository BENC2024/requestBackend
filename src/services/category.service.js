const categoryModel = require("../models/category.model")

const listCategory = async (tenantId) => {
   try {
      console.log("En el listado de categorias")
      const listCat = await categoryModel.find(tenantId);
      return listCat
   }
   catch (error){
      throw new Error(`Error al obtener las categorias: ${error.message}`);
   }
}

const detailCategory = async (id,tenantId) => {
   try {
      console.log("En el detalle")
      const list = await categoryModel.findOne({_id: id, tenantId})
      return list
   }
   catch (error){
      throw new Error(`Error al obtener una categoria: ${error.message}`);
   }
}

const saveCategory = async (category,tenantId) => {
   console.log("Guardando categorias")
   category.tenantId = tenantId
   if (!category || !category.nameCategory) {
      throw new Error("El objeto categoria no es valido o no contiene campos requeridos");
   }
   const saveCat = new categoryModel(category);
   return await saveCat.save();
}

const deleteCategory = async (id, tenantId) => {
   console.log("Borrando categoria")
   try {
      const cat = await categoryModel.findOne({ _id: id, tenantId });
      if (!cat) {
         throw new Error("TenantId proporcionado no existe o no coincide con _id de la categoria a eliminar");
      }
      const del = await categoryModel.findOneAndDelete({_id: id, tenantId});
      return del
   }
   catch (error) {
      if (error.name === 'CastError' && error.path === '_id') {
         throw new Error("_id proporcionado no es válido o no se encontro en la base de datos");
      } 
      else {
         throw error;
      }
   }
};

const updateCategory = async (id,tenantId,categoryUpdate) => {
   console.log("Actualizando categorias")
   try {
      const cat = await categoryModel.findOne({ _id: id, tenantId });
   
      if (!cat) {
        throw new Error("TenantId proporcionado no existe o no coincide con _id de la categoria a modificar");
      }
      const categoryModified =  await Categoria.findOneAndUpdate({ _id: id, tenantId }, categoryUpdate, { new: true });
      if (!categoryModified) {
        throw new Error("Categoria no encontrada");
      }
      return categoryModified;
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

module.exports = { 
   listCategory,
   detailCategory,
   saveCategory,
   deleteCategory,
   updateCategory
}
