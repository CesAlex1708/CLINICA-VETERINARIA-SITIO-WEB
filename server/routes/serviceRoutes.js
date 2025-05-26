const express = require('express');
const router = express.Router();

const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
} = require('../controllers/serviceController');

router.route('/')
    .get(getAllServices)
    .post(createService);

router.route('/:id')
    .get(getServiceById)
    .put(updateService)
    .delete(deleteService);

module.exports = router;