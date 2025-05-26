const express = require('express');
const router = express.Router(); // Creamos un enrutador de Express

// Importamos las funciones del controlador de productos
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

// Definimos las rutas y las asociamos con las funciones del controlador

// Ruta para obtener todos los productos y crear un nuevo producto
router.route('/')
    .get(getAllProducts)
    .post(createProduct); // Más adelante protegeremos esta ruta (solo admin)

// Ruta para obtener, actualizar y eliminar un producto específico por su ID
router.route('/:id')
    .get(getProductById)
    .put(updateProduct)    // Más adelante protegeremos esta ruta
    .delete(deleteProduct); // Más adelante protegeremos esta ruta

module.exports = router; // Exportamos el enrutador