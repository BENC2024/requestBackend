const { 
   listCategory,
   detailCategory,
   saveCategory,
   deleteCategory,
   updateCategory
} = require("../services/category.service")

const { responseStructure } = require("../helpers/responseStructure");

const categoryController = {}

categoryController.getCategory = async (req,res) => { 
   try {
      const tenantId = req.tenantId;
      const listCat = await listCategory(tenantId);
      responseStructure.status = 200;
      responseStructure.message = "Categoria encontrada exitosamente";
      responseStructure.data = listCat;
      res.status(200).json(responseStructure);
   }
   catch (error) {
      console.error("Error al obtener la categoria:", error);
      responseStructure.status = 404;
      responseStructure.message = "Error al obtener categoria";
      responseStructure.data = error.message;
      res.status(404).json(responseStructure);
   }
}

categoryController.findCategory = async (req,res) => {
   try {
      const categoryId = req.params.id;
      const tenantId = req.tenantId;
      const seeCategory = await detailCategory(categoryId, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "Categoria encontrada exitosamente";
      responseStructure.data = seeCategory;
      res.status(200).json(responseStructure);
   }
   catch (error) {
      console.error("Error al obtener la categoria:", error);
      responseStructure.status = 404;
      responseStructure.message = "Error al obtener categoria";
      responseStructure.data = error.message;
      res.status(404).json(responseStructure);
   }
}

categoryController.postCategory = async (req,res) => {
   try {
      const newCategory = req.body;
      const tenantId = req.tenantId;
      const saveCat = await saveCategory(newCategory,tenantId);
      responseStructure.status = 200;
      responseStructure.message = "Categoria guardada exitosamente";
      responseStructure.data = saveCat;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al guardar la categoria";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

categoryController.deleteCategoryId = async (req, res) => {
   try {
      const categoryId = req.params.id;
      const tenantId = req.tenantId;
      const deleteCat = await deleteCategory(categoryId, tenantId);
      responseStructure.status = 200;
      responseStructure.message = "Categoria eliminada exitosamemte";
      responseStructure.data = deleteCat;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 500;
      responseStructure.message = "Error al eliminar la categoria";
      responseStructure.data = error.message;
      res.status(500).json(responseStructure);
   }
}

categoryController.modifiedCategory = async (req, res) => {
   try {
      const categoryId = req.params.id;
      const dataCategory = req.body;
      const tenantId = req.tenantId;
      const modifiedCat = await updateCategory(categoryId,tenantId,dataCategory);
      responseStructure.status = 200;
      responseStructure.message = "Categoria modificada exitosamemte";
      responseStructure.data = modifiedCat;
      res.status(200).send(responseStructure);
   }
   catch (error) {
      responseStructure.status = 400;
      responseStructure.message = "Error al modificar la categoria";
      responseStructure.data = error.message;
      res.status(400).json(responseStructure);
   }
}

module.exports = categoryController
