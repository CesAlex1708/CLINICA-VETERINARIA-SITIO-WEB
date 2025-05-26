const express = require('express');
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder, // Añadimos deleteOrder
} = require('../controllers/orderController');

router.route('/')
    .get(getAllOrders)
    .post(createOrder);

router.route('/:id')
    .get(getOrderById)
    .delete(deleteOrder); // Ruta para eliminar

router.route('/:id/status') // Ruta específica para actualizar solo el estado
    .put(updateOrderStatus);

module.exports = router;