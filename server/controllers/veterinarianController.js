const Veterinarian = require('../models/Veterinarian');

// @desc    Crear un nuevo veterinario
// @route   POST /api/veterinarians
// @access  Private/Admin (futuro)
const createVeterinarian = async (req, res) => {
    try {
        const { name, specialization, bio, email, phone, imageUrl, isActive } = req.body;

        // Verificar si ya existe un veterinario con ese email (si el email es provisto y debe ser único)
        if (email) {
            const existingVet = await Veterinarian.findOne({ email });
            if (existingVet) {
                return res.status(400).json({ message: 'Ya existe un veterinario registrado con este email.' });
            }
        }

        const veterinarian = new Veterinarian({
            name,
            specialization,
            bio,
            email,
            phone,
            imageUrl,
            isActive,
        });

        const createdVeterinarian = await veterinarian.save();
        res.status(201).json(createdVeterinarian);
    } catch (error) {
        console.error('Error creating veterinarian:', error);
        // Manejar error de duplicado si 'unique: true' falla a nivel de BD por alguna razón
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ message: 'Error: El email proporcionado ya está en uso.' });
        }
        res.status(500).json({ message: 'Error al crear el veterinario', error: error.message });
    }
};

// @desc    Obtener todos los veterinarios
// @route   GET /api/veterinarians
// @access  Public (o Private/Admin para gestión interna)
const getAllVeterinarians = async (req, res) => {
    try {
        // Podríamos filtrar por activos: const veterinarians = await Veterinarian.find({ isActive: true });
        const veterinarians = await Veterinarian.find({});
        res.status(200).json(veterinarians);
    } catch (error) {
        console.error('Error fetching veterinarians:', error);
        res.status(500).json({ message: 'Error al obtener los veterinarios', error: error.message });
    }
};

// @desc    Obtener un veterinario por su ID
// @route   GET /api/veterinarians/:id
// @access  Public (o Private/Admin)
const getVeterinarianById = async (req, res) => {
    try {
        const veterinarian = await Veterinarian.findById(req.params.id);

        if (veterinarian) {
            res.status(200).json(veterinarian);
        } else {
            res.status(404).json({ message: 'Veterinario no encontrado' });
        }
    } catch (error) {
        console.error(`Error fetching veterinarian with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Veterinario no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al obtener el veterinario', error: error.message });
    }
};

// @desc    Actualizar un veterinario
// @route   PUT /api/veterinarians/:id
// @access  Private/Admin (futuro)
const updateVeterinarian = async (req, res) => {
    try {
        const { name, specialization, bio, email, phone, imageUrl, isActive } = req.body;
        const veterinarian = await Veterinarian.findById(req.params.id);

        if (veterinarian) {
            // Si se está actualizando el email, verificar que no exista ya en otro veterinario
            if (email && email !== veterinarian.email) {
                const existingVet = await Veterinarian.findOne({ email });
                if (existingVet) {
                    return res.status(400).json({ message: 'El nuevo email proporcionado ya está en uso por otro veterinario.' });
                }
            }

            veterinarian.name = name || veterinarian.name;
            veterinarian.specialization = specialization || veterinarian.specialization;
            veterinarian.bio = bio || veterinarian.bio;
            veterinarian.email = email || veterinarian.email;
            veterinarian.phone = phone || veterinarian.phone;
            veterinarian.imageUrl = imageUrl === undefined ? veterinarian.imageUrl : imageUrl; // permitir borrar imagen si se pasa null o ""
            veterinarian.isActive = isActive === undefined ? veterinarian.isActive : isActive;


            const updatedVeterinarian = await veterinarian.save();
            res.status(200).json(updatedVeterinarian);
        } else {
            res.status(404).json({ message: 'Veterinario no encontrado' });
        }
    } catch (error) {
        console.error(`Error updating veterinarian with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Veterinario no encontrado (ID inválido)' });
        }
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
             return res.status(400).json({ message: 'Error: El email proporcionado ya está en uso.' });
        }
        res.status(500).json({ message: 'Error al actualizar el veterinario', error: error.message });
    }
};

// @desc    Eliminar un veterinario
// @route   DELETE /api/veterinarians/:id
// @access  Private/Admin (futuro)
const deleteVeterinarian = async (req, res) => {
    try {
        const veterinarian = await Veterinarian.findById(req.params.id);

        if (veterinarian) {
            // Considerar qué pasa con las citas asignadas a este veterinario.
            // Podríamos desasignarlas o impedir la eliminación si tiene citas activas.
            // Por ahora, eliminación simple.
            await veterinarian.deleteOne();
            res.status(200).json({ message: 'Veterinario eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Veterinario no encontrado' });
        }
    } catch (error) {
        console.error(`Error deleting veterinarian with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Veterinario no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al eliminar el veterinario', error: error.message });
    }
};

module.exports = {
    createVeterinarian,
    getAllVeterinarians,
    getVeterinarianById,
    updateVeterinarian,
    deleteVeterinarian,
};