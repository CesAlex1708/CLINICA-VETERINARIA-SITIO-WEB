const Product = require('../models/Product'); // Importamos el modelo Product

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private/Admin (lo haremos privado más adelante)
const createProduct = async (req, res) => {
    try {
        // Obtenemos los datos del cuerpo de la solicitud
        // En un futuro, aquí podríamos añadir validación extra o sanitización
        const { name, description, price, category, imageUrl, stock } = req.body;

        const product = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            // Podríamos añadir createdBy: req.user.id si tuviéramos autenticación
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // {} como filtro vacío trae todos
        res.status(200).json(products);
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

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price === undefined ? product.price : price; // Permite precio 0
            product.category = category || product.category;
            product.imageUrl = imageUrl || product.imageUrl;
            product.stock = stock === undefined ? product.stock : stock; // Permite stock 0

            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(`Error updating product with ID ${req.params.id}:`, error);
         if (error.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Producto no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
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