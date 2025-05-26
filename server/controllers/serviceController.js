const Service = require('../models/Service'); // Importamos el modelo Service

// @desc    Crear un nuevo servicio
// @route   POST /api/services
// @access  Private/Admin (futuro)
const createService = async (req, res) => {
    try {
        const { name, description, duration, price, category } = req.body;

        const service = new Service({
            name,
            description,
            duration,
            price,
            category,
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Error al crear el servicio', error: error.message });
    }
};

// @desc    Obtener todos los servicios
// @route   GET /api/services
// @access  Public
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Error al obtener los servicios', error: error.message });
    }
};

// @desc    Obtener un servicio por su ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (service) {
            res.status(200).json(service);
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        console.error(`Error fetching service with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Servicio no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al obtener el servicio', error: error.message });
    }
};

// @desc    Actualizar un servicio
// @route   PUT /api/services/:id
// @access  Private/Admin (futuro)
const updateService = async (req, res) => {
    try {
        const { name, description, duration, price, category } = req.body;
        const service = await Service.findById(req.params.id);

        if (service) {
            service.name = name || service.name;
            service.description = description || service.description;
            service.duration = duration || service.duration;
            service.price = price === undefined ? service.price : price;
            service.category = category || service.category;

            const updatedService = await service.save();
            res.status(200).json(updatedService);
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        console.error(`Error updating service with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Servicio no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al actualizar el servicio', error: error.message });
    }
};

// @desc    Eliminar un servicio
// @route   DELETE /api/services/:id
// @access  Private/Admin (futuro)
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (service) {
            await service.deleteOne();
            res.status(200).json({ message: 'Servicio eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Servicio no encontrado' });
        }
    } catch (error) {
        console.error(`Error deleting service with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Servicio no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al eliminar el servicio', error: error.message });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};