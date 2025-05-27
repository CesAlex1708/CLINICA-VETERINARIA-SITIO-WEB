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
const upload = require('../middleware/uploadMiddleware');

// Definimos las rutas y las asociamos con las funciones del controlador

// Ruta para obtener todos los productos y crear un nuevo producto
router.route('/')
    .get(getAllProducts)
    // Usar upload.single('nombreDelCampoDeImagen') ANTES de protect y authorize
    // 'productImage' es el nombre del campo que Postman/frontend usará para enviar el archivo
    .post(upload.single('productImage'), protect, authorize('admin'), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(upload.single('productImage'), protect, authorize('admin'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;