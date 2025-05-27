const multer = require('multer');
const path = require('path'); // Módulo 'path' de Node.js para manejar rutas de archivos

// Configuración del almacenamiento para Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define la carpeta donde se guardarán los archivos
        cb(null, 'server/public/uploads/images/');
    },
    filename: function (req, file, cb) {
        // Define el nombre del archivo: campoOriginal-timestamp.extensionOriginal
        // ej. productImage-1623456789012.jpg
        cb(null, `<span class="math-inline">\{file\.fieldname\}\-</span>{Date.now()}${path.extname(file.originalname)}`);
    }
});

// Filtro de archivos para aceptar solo ciertos tipos de imágenes
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
    // Verificar la extensión del archivo
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    // Verificar el tipo MIME
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Error: ¡Solo se permiten archivos de imagen (jpeg, jpg, png, gif, webp)!'), false); // Rechazar el archivo
    }
};

// Inicializar Multer con la configuración de almacenamiento y el filtro de archivos
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Límite de tamaño de archivo: 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;