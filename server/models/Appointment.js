const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: [true, 'El nombre de la mascota es obligatorio.'],
        trim: true
    },
    petType: { // Opcional, pero útil
        type: String,
        trim: true,
        enum: ['Perro', 'Gato', 'Ave', 'Roedor', 'Reptil', 'Otro']
    },
    ownerName: {
        type: String,
        required: [true, 'El nombre del dueño es obligatorio.'],
        trim: true
    },
    ownerEmail: {
        type: String,
        required: [true, 'El email del dueño es obligatorio.'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Por favor, introduce un email válido.']
    },
    ownerPhone: {
        type: String,
        required: [true, 'El teléfono del dueño es obligatorio.'],
        trim: true
    },
    serviceRequested: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service', // Esto crea una referencia al modelo 'Service'
        required: [true, 'El servicio solicitado es obligatorio.']
    },
    veterinarianAssigned: { // Opcional, podría asignarse después
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinarian' // Referencia al modelo 'Veterinarian'
    },
    appointmentDate: {
        type: Date,
        required: [true, 'La fecha de la cita es obligatoria.']
    },
    appointmentTime: { // Podría ser parte de 'appointmentDate', pero a veces es más fácil manejarlo así para UIs
        type: String,
        required: [true, 'La hora de la cita es obligatoria.']
    },
    reasonForVisit: { // Un breve motivo o síntoma
        type: String,
        trim: true,
        maxlength: [500, 'El motivo no puede exceder los 500 caracteres.']
    },
    status: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Confirmada', 'Cancelada por Cliente', 'Cancelada por Clínica', 'Completada', 'No Asistió'],
        default: 'Pendiente'
    },
    clientNotes: { // Notas adicionales del cliente al agendar
        type: String,
        trim: true,
        maxlength: [500, 'Las notas del cliente no pueden exceder los 500 caracteres.']
    },
    clinicNotes: { // Notas internas de la clínica para la cita
        type: String,
        trim: true,
        maxlength: [500, 'Las notas de la clínica no pueden exceder los 500 caracteres.']
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

appointmentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;