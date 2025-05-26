const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador de autenticación
const {
    registerUser,
    loginUser,
} = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
// POST /api/auth/register
router.post('/register', registerUser);

// Ruta para iniciar sesión (autenticar) un usuario
// POST /api/auth/login
router.post('/login', loginUser);

// Más adelante podríamos añadir más rutas aquí, como:
// router.get('/me', protect, getMe); // Para obtener el perfil del usuario logueado

module.exports = router;