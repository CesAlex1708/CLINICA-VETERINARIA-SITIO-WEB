const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Necesitamos el modelo User para buscar al usuario

const protect = async (req, res, next) => {
    let token;

    // Los tokens JWT suelen enviarse en la cabecera 'Authorization' con el formato 'Bearer token_string'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Obtener el token de la cabecera (quitando 'Bearer ')
            token = req.headers.authorization.split(' ')[1];

            // 2. Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Obtener el usuario del token (el payload del token tiene el 'id' del usuario)
            // Y adjuntarlo al objeto 'req' para que esté disponible en las rutas protegidas
            // Excluimos la contraseña al seleccionar el usuario
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                // Si el usuario asociado al token ya no existe
                return res.status(401).json({ message: 'No autorizado, usuario no encontrado.' });
            }

            if (!req.user.isActive) {
                // Si el usuario está desactivado
                return res.status(401).json({ message: 'No autorizado, cuenta de usuario desactivada.' });
            }

            next(); // Continuar al siguiente middleware o al controlador de la ruta
        } catch (error) {
            console.error('Error en el middleware de protección:', error.message);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'No autorizado, token inválido.' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'No autorizado, el token ha expirado.' });
            }
            return res.status(401).json({ message: 'No autorizado, token falló.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no se proporcionó token.' });
    }
};

// Más adelante aquí añadiremos el middleware 'authorize' para roles

const authorize = (...roles) => { // Recibe una lista de roles permitidos como argumentos
    return (req, res, next) => {
        // req.user debería haber sido establecido por el middleware 'protect'
        if (!req.user || !req.user.role) {
            // Esto no debería suceder si 'protect' se ejecuta antes y correctamente
            return res.status(401).json({ message: 'No autorizado, información de usuario no disponible.' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ // 403 Forbidden
                message: `Acceso denegado. Rol '${req.user.role}' no tiene permiso para acceder a este recurso.`
            });
        }
        next(); // El rol del usuario está en la lista de roles permitidos, continuar
    };
};

module.exports = { protect, authorize };