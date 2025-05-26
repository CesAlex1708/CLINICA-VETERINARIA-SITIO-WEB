const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio.'],
        trim: true, // Elimina espacios en blanco al inicio y al final
        maxlength: [100, 'El nombre del producto no puede exceder los 100 caracteres.']
    },
    description: {
        type: String,
        required: [true, 'La descripción del producto es obligatoria.'],
        trim: true,
        maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres.']
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio.'],
        min: [0, 'El precio no puede ser negativo.']
    },
    category: {
        type: String,
        required: [true, 'La categoría del producto es obligatoria.'],
        trim: true,
        enum: ['Alimentos', 'Accesorios', 'Medicamentos', 'Higiene', 'Juguetes', 'Otros'] // Ejemplo de categorías
    },
    imageUrl: {
        type: String,
        trim: true,
        // Podrías añadir una validación de formato de URL si quieres
        // default: '/images/default-product.png' // Una imagen por defecto si no se provee
    },
    stock: {
        type: Number,
        required: [true, 'La cantidad en stock es obligatoria.'],
        min: [0, 'El stock no puede ser negativo.'],
        default: 0
    },
    // Opcional: Campos de auditoría
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para actualizar 'updatedAt' antes de cada 'save'
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Middleware para actualizar 'updatedAt' antes de 'findOneAndUpdate'
// Nota: para 'findOneAndUpdate', 'this' se refiere a la consulta, no al documento.
// Hay formas más complejas de asegurar que 'updatedAt' se actualice con findOneAndUpdate,
// pero para simplificar, nos enfocaremos en 'save' por ahora o lo manejaremos en el controlador.

const Product = mongoose.model('Product', productSchema);

module.exports = Product;