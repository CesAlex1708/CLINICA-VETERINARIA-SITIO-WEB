const Appointment = require('../models/Appointment');
const Service = require('../models/Service'); // Necesario para validar el servicio
// const Veterinarian = require('../models/Veterinarian'); // Necesario si validamos/asignamos veterinario aquí

// @desc    Crear una nueva cita
// @route   POST /api/appointments
// @access  Public (o Private/User si implementamos login de clientes)
const createAppointment = async (req, res) => {
    try {
        const {
            petName,
            petType,
            ownerName,
            ownerEmail,
            ownerPhone,
            serviceRequested, // Se espera el ID del servicio
            appointmentDate,
            appointmentTime,
            reasonForVisit,
            clientNotes
        } = req.body;

        // Verificación opcional: que el servicio exista
        const serviceExists = await Service.findById(serviceRequested);
        if (!serviceExists) {
            return res.status(400).json({ message: 'El servicio solicitado no existe.' });
        }

        const appointment = new Appointment({
            petName,
            petType,
            ownerName,
            ownerEmail,
            ownerPhone,
            serviceRequested,
            appointmentDate,
            appointmentTime,
            reasonForVisit,
            clientNotes,
            // status por defecto es 'Pendiente' según el modelo
        });

        const createdAppointment = await appointment.save();
        // Podríamos popular el servicio al devolverlo para más info
        const populatedAppointment = await Appointment.findById(createdAppointment._id)
            .populate('serviceRequested', 'name price duration'); // Solo algunos campos del servicio

        res.status(201).json(populatedAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'Error al crear la cita', error: error.message });
    }
};

// @desc    Obtener todas las citas
// @route   GET /api/appointments
// @access  Private/Admin (generalmente)
const getAllAppointments = async (req, res) => {
    try {
        // Podríamos añadir filtros aquí: ?date=YYYY-MM-DD, ?status=Pendiente, etc.
        const appointments = await Appointment.find({})
            .populate('serviceRequested', 'name category') // Trae nombre y categoría del servicio
            .populate('veterinarianAssigned', 'name specialization'); // Trae nombre y especialización del veterinario
        // .sort({ appointmentDate: -1 }); // Ordenar por fecha, más recientes primero

        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
    }
};

// @desc    Obtener una cita por su ID
// @route   GET /api/appointments/:id
// @access  Private (dueño de la cita o Admin)
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('serviceRequested') // Trae todos los campos del servicio
            .populate('veterinarianAssigned', 'name specialization imageUrl');

        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    } catch (error) {
        console.error(`Error fetching appointment with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Cita no encontrada (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al obtener la cita', error: error.message });
    }
};

// @desc    Actualizar una cita (ej. estado, veterinario asignado, notas)
// @route   PUT /api/appointments/:id
// @access  Private (dueño o Admin)
const updateAppointment = async (req, res) => {
    try {
        const {
            appointmentDate,
            appointmentTime,
            status,
            veterinarianAssigned, // Se espera el ID del veterinario
            clinicNotes,
            // Otros campos que el admin/usuario pueda actualizar
        } = req.body;

        const appointment = await Appointment.findById(req.params.id);

        if (appointment) {
            appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
            appointment.appointmentTime = appointmentTime || appointment.appointmentTime;
            appointment.status = status || appointment.status;
            appointment.clinicNotes = clinicNotes || appointment.clinicNotes;

            if (veterinarianAssigned !== undefined) {
                 // Podríamos añadir validación para que el ID del veterinario exista
                appointment.veterinarianAssigned = veterinarianAssigned; // puede ser null para desasignar
            }
            // No permitir cambiar datos del dueño o mascota fácilmente por esta vía general

            const updatedAppointment = await appointment.save();
            // Popular al devolver para mejor respuesta
            const populatedAppointment = await Appointment.findById(updatedAppointment._id)
                .populate('serviceRequested', 'name')
                .populate('veterinarianAssigned', 'name');

            res.status(200).json(populatedAppointment);
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    } catch (error) {
        console.error(`Error updating appointment with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Cita no encontrada (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
    }
};

// @desc    Eliminar una cita
// @route   DELETE /api/appointments/:id
// @access  Private (Admin o dueño si es antes de cierto tiempo)
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (appointment) {
            await appointment.deleteOne();
            res.status(200).json({ message: 'Cita eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    } catch (error) {
        console.error(`Error deleting appointment with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Cita no encontrada (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};