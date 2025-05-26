const Order = require('../models/Order');
const Product = require('../models/Product'); // Para verificar productos y obtener precios

// @desc    Crear un nuevo pedido
// @route   POST /api/orders
// @access  Public (o Private/User si hay login)
const createOrder = async (req, res) => {
    try {
        const { customerInfo, orderItems, shippingAddress, paymentMethod, shippingPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No hay artículos en el pedido.' });
        }

        // 1. Preparar los artículos del pedido y calcular el subtotal de artículos
        let itemsPrice = 0;
        const processedOrderItems = await Promise.all(
            orderItems.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    // Si un producto no se encuentra, lanzamos un error que será capturado por el catch general.
                    throw new Error(`Producto no encontrado con ID: ${item.product}`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Stock insuficiente para el producto: ${product.name}`);
                }
                itemsPrice += product.price * item.quantity;
                return {
                    product: product._id,
                    name: product.name,
                    quantity: item.quantity,
                    price: product.price, // Precio al momento de la orden
                };
            })
        );

        // 2. Calcular el monto total
        const calculatedShippingPrice = shippingPrice || 0; // Si no se provee, es 0
        const totalAmount = itemsPrice + calculatedShippingPrice;

        // 3. Crear el pedido
        const order = new Order({
            customerInfo,
            orderItems: processedOrderItems,
            shippingAddress: shippingAddress || customerInfo.address, // Usar dirección del cliente si no hay de envío
            paymentMethod,
            itemsPrice, // Podríamos añadir este campo al modelo Order si queremos desglosar
            shippingPrice: calculatedShippingPrice,
            totalAmount,
            // status por defecto es 'Pendiente de Pago'
        });

        const createdOrder = await order.save();

        // Opcional: Aquí podríamos simular la reducción de stock de los productos
        // for (const item of createdOrder.orderItems) {
        //    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
        // }

        // Popular los detalles del producto en los items del pedido creado para la respuesta
        const populatedOrder = await Order.findById(createdOrder._id)
            .populate('orderItems.product', 'name imageUrl'); // Solo algunos campos

        res.status(201).json(populatedOrder);

    } catch (error) {
        console.error('Error creating order:', error);
        // Si el error fue lanzado por nosotros (producto no encontrado, stock insuficiente)
        if (error.message.startsWith('Producto no encontrado') || error.message.startsWith('Stock insuficiente')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
    }
};

// @desc    Obtener todos los pedidos
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('orderItems.product', 'name') // Popular nombre del producto
            .sort({ createdAt: -1 }); // Más recientes primero
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
    }
};

// @desc    Obtener un pedido por su ID
// @route   GET /api/orders/:id
// @access  Private (Admin o dueño del pedido)
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('orderItems.product', 'name imageUrl price'); // Detalles de los productos en el pedido

        if (order) {
            // Aquí podríamos añadir lógica para verificar si el usuario logueado es el dueño del pedido
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error(`Error fetching order with ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Pedido no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
    }
};

// @desc    Actualizar el estado de un pedido (ej. a 'Pagado', 'Enviado')
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            // Validar que el status sea uno de los permitidos en el enum del modelo
            const allowedStatuses = Order.schema.path('status').enumValues;
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({ message: `Estado inválido. Estados permitidos: ${allowedStatuses.join(', ')}` });
            }

            order.status = status;

            // Si el estado es 'Pagado', podríamos registrar la fecha de pago
            if (status === 'Pagado' && !order.paidAt) { // Suponiendo que tuvieras un campo paidAt
                // order.paidAt = Date.now();
                // order.paymentResult = { ... }; // Si tuvieras info del pago
            }
            // Si el estado es 'Entregado', podríamos registrar la fecha de entrega
            if (status === 'Entregado' && !order.deliveredAt) { // Suponiendo campo deliveredAt
                // order.deliveredAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error(`Error updating order status for ID ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Pedido no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al actualizar el estado del pedido', error: error.message });
    }
};

// @desc    Eliminar un pedido (Usar con precaución, generalmente se marcan como cancelados)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            await order.deleteOne();
            res.status(200).json({ message: 'Pedido eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error(`Error deleting order with ID ${req.params.id}:`, error);
         if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Pedido no encontrado (ID inválido)' });
        }
        res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
    }
};


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder, // Añadimos la función de eliminar
};