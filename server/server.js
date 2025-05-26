// 1. Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // <--- AÑADE ESTA LÍNEA

// 2. Cargar las variables de entorno del archivo .env que está en la carpeta /server
dotenv.config(); // Por defecto buscará un archivo .env en el directorio actual (server/)

// LÍNEA DE DEPURACIÓN TEMPORAL (puedes quitarla después)
console.log('DEBUG - Loaded MONGODB_URI from .env:', process.env.MONGODB_URI);
console.log('DEBUG - Loaded PORT from .env:', process.env.PORT);


// 3. Crear la aplicación Express
const app = express();

// 4. Middlewares esenciales
// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors());
// Permitir que Express entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// 5. Conexión a la Base de Datos MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('ERROR CRÍTICO: La variable MONGODB_URI no está definida en tu archivo .env');
    console.error('Asegúrate de que el archivo "server/.env" existe y contiene la MONGODB_URI.');
    process.exit(1); // Salir si la URI no está definida
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully! ✨');
    })
    .catch(err => {
        console.error('MongoDB Connection Error: 💥', err);
        console.error('Detalles del error:', err.message); // Imprimir mensaje de error específico
        console.error('Verifica lo siguiente:');
        console.error('1. Que tu cadena de conexión MONGODB_URI en "server/.env" es correcta (usuario, contraseña, cluster, nombre de BD).');
        console.error('2. Que tu IP está permitida en MongoDB Atlas (Network Access - prueba con "Allow Access From Anywhere").');
        console.error('3. Que el cluster de MongoDB Atlas está activo y no en pausa.');
        process.exit(1); // Salir del proceso si no se puede conectar a la BD
    });

// 6. Rutas de ejemplo (luego las moveremos a archivos separados)
app.get('/api', (req, res) => {
    res.json({ message: '🎉 Welcome to the CLINICA-VETERINARIA-SITIO-WEB API! 🐾' });
});

// Montar las rutas de la API
app.use('/api/products', productRoutes); // <--- AÑADE ESTA LÍNEA

// Aquí irán las rutas para productos, citas, etc. más adelante

// 7. Iniciar el servidor
const PORT = process.env.PORT || 5001; // Usar el puerto del .env o 5001 como respaldo

app.listen(PORT, () => {
    console.log(`🐾 Veterinary API Server listening on http://localhost:${PORT} 🚀`);
});