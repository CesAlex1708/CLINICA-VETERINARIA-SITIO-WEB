const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId }, // El payload del token (información que queremos guardar en él)
        process.env.JWT_SECRET, // El secreto para firmar el token
        { expiresIn: process.env.JWT_EXPIRES_IN } // Cuándo expira el token
    );
};

module.exports = generateToken;