const express = require('express');
const router = express.Router();

const {
    createVeterinarian,
    getAllVeterinarians,
    getVeterinarianById,
    updateVeterinarian,
    deleteVeterinarian,
} = require('../controllers/veterinarianController');

router.route('/')
    .get(getAllVeterinarians)
    .post(createVeterinarian);

router.route('/:id')
    .get(getVeterinarianById)
    .put(updateVeterinarian)
    .delete(deleteVeterinarian);

module.exports = router;