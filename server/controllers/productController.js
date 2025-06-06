const Product = require('../models/Product'); // Importamos el modelo Product
const multer = require('multer');

// @desc    Crear un nuevo producto CON IMAGEN
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        let imageUrl = ''; // Valor por defecto si no se sube imagen
        if (req.file) {
            // req.file es añadido por multer si se sube un archivo
            // Construimos la URL relativa para guardar en la BD
            // Asumiendo que 'server/public' se sirve como raíz estática '/'
            // y 'uploads/images' está dentro de 'public'
            imageUrl = `/uploads/images/${req.file.filename}`;
        } else if (req.body.imageUrl) {
            // Permitir también pasar una URL externa si no se sube archivo
            imageUrl = req.body.imageUrl;
        }


        const product = new Product({
            name,
            description,
            price,
            category,
            imageUrl: imageUrl, // Usar la ruta del archivo subido o la URL provista
            stock,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product with image:', error);
        // Si el error es de Multer (ej. tipo de archivo no permitido)
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ message: `Error de Multer: ${error.message}` });
        } else if (error.message.includes('¡Solo se permiten archivos de imagen')) { // Error de nuestro fileFilter
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// @desc    Actualizar un producto CON IMAGEN
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price === undefined ? product.price : price;
            product.category = category || product.category;
            product.stock = stock === undefined ? product.stock : stock;

            if (req.file) {
                // Si se sube un nuevo archivo, actualizar imageUrl
                // (Opcional: podrías querer borrar la imagen antigua del servidor aquí)
                product.imageUrl = `/uploads/images/${req.file.filename}`;
            } else if (req.body.imageUrl !== undefined) {
                // Si se provee imageUrl en el body (puede ser para borrarla o cambiarla a una URL externa)
                // Si req.body.imageUrl es "", se borraría la referencia.
                product.imageUrl = req.body.imageUrl;
            }
            // Si no se manda req.file ni req.body.imageUrl, la imagen actual se conserva.


            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(`Error updating product with image for ID ${req.params.id}:`, error);
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ message: `Error de Multer: ${error.message}` });
        } else if (error.message.includes('¡Solo se permiten archivos de imagen')) {
            return res.status(400).json({ message: error.message });
        }
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Producto no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public

// Reemplaza tu función getAllProducts completa con esta:

const getAllProducts = async (req, res) => {
    try {
        // Asegurarse de que 'limit' y 'page' están definidos al principio
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10; // Esta línea probablemente faltaba
        const skip = (page - 1) * limit;

        const filterObject = {};

        if (req.query.category) {
            // Filtro por categoría (usando backticks ` ` correctamente)
            filterObject.category = { $regex: `^${req.query.category}$`, $options: 'i' };
        } else {
            // Excluir promociones si no se especifica una categoría
            filterObject.category = { $ne: 'Promociones' };
        }

        if (req.query.search) {
            const searchTerm = req.query.search;
            filterObject.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        const totalProducts = await Product.countDocuments(filterObject);

        const products = await Product.find(filterObject)
            .limit(limit) // Aquí se usa 'limit'
            .skip(skip)
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Productos obtenidos exitosamente",
            data: products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts: totalProducts,
            limit: limit // Y aquí también se usa 'limit'
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

// @desc    Obtener un producto por su ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(`Error fetching product with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') { // Si el ID no es un ObjectId válido
             return res.status(404).json({ message: 'Producto no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};


// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne(); // o product.remove() en versiones más antiguas de Mongoose
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(`Error deleting product with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Producto no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};