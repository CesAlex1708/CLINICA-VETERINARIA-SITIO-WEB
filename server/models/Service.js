const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del servicio es obligatorio.'],
        trim: true,
        maxlength: [100, 'El nombre del servicio no puede exceder los 100 caracteres.']
    },
    description: {
        type: String,
        required: [true, 'La descripción del servicio es obligatoria.'],
        trim: true,
        maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres.']
    },
    duration: { // Por ejemplo: "30 minutos", "1 hora", o podrías usar un Number en minutos.
        type: String,
        trim: true,
        required: [true, 'La duración del servicio es obligatoria.']
    },
    price: {
        type: Number,
        // No lo hacemos requerido por si algunos servicios tienen precio variable o son informativos
        min: [0, 'El precio no puede ser negativo.']
    },
    category: {
        type: String,
        required: [true, 'La categoría del servicio es obligatoria.'],
        trim: true,
        enum: ['Consulta', 'Vacunación', 'Cirugía', 'Estética', 'Exámenes de Laboratorio', 'Urgencias', 'Otros']
    },
    // Podríamos añadir más campos como 'preparacionRequeridaCliente', 'equipamientoNecesario', etc.
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

serviceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;