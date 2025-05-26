const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importamos bcryptjs para hashear contraseñas

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio.'],
        unique: true, // El email debe ser único
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Por favor, introduce un email válido.'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'],
        // No guardaremos la contraseña en texto plano, se hasheará
    },
    role: {
        type: String,
        enum: ['cliente', 'admin', 'veterinario'], // Roles permitidos
        default: 'cliente', // Rol por defecto al registrarse
    },
    isActive: { // Para desactivar cuentas si es necesario
        type: Boolean,
        default: true,
    },
    // Podríamos añadir más campos como 'telefono', 'direccion', 'fechaDeRegistro', etc.
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware: Hashear la contraseña ANTES de guardar el usuario en la BD
userSchema.pre('save', async function (next) {
    // Solo hashear la contraseña si ha sido modificada (o es nueva)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10); // Generar un 'salt' para el hash
        this.password = await bcrypt.hash(this.password, salt); // Hashear la contraseña
        next();
    } catch (error) {
        next(error); // Pasar el error al siguiente middleware o al manejador de errores
    }
});

// Middleware para actualizar 'updatedAt'
userSchema.pre('save', function(next) {
    if (this.isModified()) { // Solo si el documento ha sido modificado
        this.updatedAt = Date.now();
    }
    next();
});


// Método para comparar la contraseña ingresada con la hasheada en la BD
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;