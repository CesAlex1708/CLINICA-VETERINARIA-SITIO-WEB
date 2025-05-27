const User = require('../models/User'); // Importamos el modelo User
const generateToken = require('../utils/generateToken'); // Importamos nuestro generador de tokens

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register  (o /api/auth/register)
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Verificar si el email ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario con este email ya existe.' });
        }

        // 2. Crear el nuevo usuario (la contraseña se hasheará automáticamente por el middleware pre-save del modelo)
        const user = new User({
            name,
            email,
            password, // Pasamos la contraseña en texto plano, el modelo se encarga de hashearla
            role: role || 'cliente', // Si no se especifica rol, por defecto es 'cliente'
        });

        await user.save(); // Guardar el usuario en la BD

        // 3. Si el usuario se creó exitosamente, generar un token y enviar respuesta
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                token: generateToken(user._id), // Generar y enviar el token
            });
        } else {
            // Este caso es menos probable si .save() no lanza error, pero por si acaso
            res.status(400).json({ message: 'Datos de usuario inválidos.' });
        }

    } catch (error) {
        console.error('Error en registerUser:', error);
        // Capturar errores de validación de Mongoose (ej. campos requeridos faltantes, email inválido)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Error en el servidor al registrar el usuario.', error: error.message });
    }
};


// @desc    Autenticar (iniciar sesión) un usuario y obtener token
// @route   POST /api/users/login (o /api/auth/login)
// @access  Public

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario por email
        const user = await User.findOne({ email });

        // 2. Si el usuario existe y la contraseña coincide (usando el método que creamos en el modelo)
        if (user && (await user.matchPassword(password))) {
            if (!user.isActive) {
                return res.status(403).json({ message: 'Tu cuenta está desactivada. Contacta al administrador.' });
            }
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Email o contraseña inválidos.' }); // 401 Unauthorized
        }

    } catch (error) {
        console.error('Error en loginUser:', error);
        res.status(500).json({ message: 'Error en el servidor al iniciar sesión.', error: error.message });
    }
};

const getMe = async (req, res) => {
    // req.user es establecido por el middleware 'protect'
    if (req.user) {
        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            isActive: req.user.isActive,
            createdAt: req.user.createdAt
        });
    } else {
        // Este caso no debería ocurrir si 'protect' funciona bien, pero por si acaso.
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// Podríamos añadir más funciones aquí después, como:
// - getUserProfile (para que un usuario logueado obtenga sus propios datos)
// - updateUserProfile
// - getAllUsers (admin)
// - deleteUser (admin)
// - etc.

module.exports = {
    registerUser,
    loginUser,
    getMe,
};