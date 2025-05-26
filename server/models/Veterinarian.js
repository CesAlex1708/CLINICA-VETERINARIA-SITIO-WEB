const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del veterinario es obligatorio.'],
        trim: true
    },
    specialization: {
        type: String,
        required: [true, 'La especialización es obligatoria.'],
        trim: true,
        default: 'Medicina General Veterinaria'
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [1000, 'La biografía no puede exceder los 1000 caracteres.']
    },
    email: { // Email profesional del veterinario
        type: String,
        trim: true,
        lowercase: true,
        unique: true, // Asumimos que cada veterinario tiene un email único en el sistema
        sparse: true, // Permite múltiples documentos con valor null/ausente para email, pero si existe, debe ser único
        match: [/\S+@\S+\.\S+/, 'Por favor, introduce un email válido.']
    },
    phone: { // Teléfono de contacto o extensión
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        trim: true
    },
    // Podríamos añadir un subdocumento o array para horarios de disponibilidad
    // availableSlots: [{ dayOfWeek: String, startTime: String, endTime: String }],
    isActive: { // Para marcar si el veterinario está actualmente activo en la clínica
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

veterinarianSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Veterinarian = mongoose.model('Veterinarian', veterinarianSchema);

module.exports = Veterinarian;