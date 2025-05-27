const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador de autenticación
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware'); // Importamos el middleware de protección para rutas privadas

// Ruta para registrar un nuevo usuario
// POST /api/auth/register
router.post('/register', registerUser);

// Ruta para iniciar sesión (autenticar) un usuario
// POST /api/auth/login
router.post('/login', loginUser);

// Más adelante podríamos añadir más rutas aquí, como:
// router.get('/me', protect, getMe); // Para obtener el perfil del usuario logueado

router.get('/me', protect, getMe); // Ruta para obtener el perfil del usuario logueados

module.exports = router;