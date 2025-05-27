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

// Importar middlewares de autenticación y autorización
const { protect, authorize } = require('../middleware/authMiddleware');

// Definimos las rutas y las asociamos con las funciones del controlador

// Ruta para obtener todos los productos y crear un nuevo producto
router.route('/')
    .get(getAllProducts)
    .post(protect, authorize('admin'), createProduct); // Proteger y autorizar para admin

// Ruta para obtener un producto específico por su ID (Pública)
// y actualizar y eliminar un producto (Solo Admin)
router.route('/:id')
    .get(getProductById)
    .put(protect, authorize('admin'), updateProduct)    // Proteger y autorizar para admin
    .delete(protect, authorize('admin'), deleteProduct); // Proteger y autorizar para admin

module.exports = router;