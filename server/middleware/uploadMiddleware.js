const multer = require('multer');
const path = require('path');
const fs = require('node:fs'); // Necesitamos 'fs' para crear el directorio

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // __dirname aquí es: .../clinica-veterinaria-sitio-web/server/middleware
        // Queremos llegar a: .../clinica-veterinaria-sitio-web/server/public/uploads/images
        const uploadDest = path.resolve(__dirname, '..', 'public', 'uploads', 'images');

        // console.log('DEBUG: Multer destination path calculated as:', uploadDest); // Descomenta para depurar

        // Asegurarse de que el directorio de destino exista, crearlo si no
        fs.mkdirSync(uploadDest, { recursive: true }); // recursive: true crea directorios padres si no existen

        cb(null, uploadDest);
    },
    filename: function (req, file, cb) {
        // Usar backticks (`) para la plantilla de cadena
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        const err = new Error('Error: ¡Solo se permiten archivos de imagen (jpeg, jpg, png, gif, webp)!');
        err.code = 'INVALID_FILE_TYPE'; // Puedes usar este código para manejo de errores más específico
        return cb(err, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;