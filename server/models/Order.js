const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: { // Denormalizado para fácil acceso, aunque se puede obtener del producto
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'La cantidad debe ser al menos 1.']
    },
    price: { // Precio del producto al momento de la compra
        type: Number,
        required: true
    }
}, {_id: false}); // _id: false para que los subdocumentos no tengan su propio _id por defecto si no lo necesitas

const orderSchema = new mongoose.Schema({
    customerInfo: {
        name: { type: String, required: [true, 'El nombre del cliente es obligatorio.'], trim: true },
        email: { type: String, required: [true, 'El email del cliente es obligatorio.'], trim: true, lowercase: true },
        phone: { type: String, required: [true, 'El teléfono del cliente es obligatorio.'], trim: true },
        address: { // Dirección de envío o facturación
            street: { type: String, required: [true, 'La calle es obligatoria.'], trim: true },
            city: { type: String, required: [true, 'La ciudad es obligatoria.'], trim: true },
            state: { type: String, required: [true, 'El estado/provincia es obligatorio.'], trim: true },
            zipCode: { type: String, required: [true, 'El código postal es obligatorio.'], trim: true },
            country: { type: String, required: [true, 'El país es obligatorio.'], trim: true, default: 'México' }
        }
    },
    orderItems: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: [true, 'El monto total del pedido es obligatorio.'],
        min: [0, 'El monto total no puede ser negativo.']
    },
    status: {
        type: String,
        required: true,
        enum: ['Pendiente de Pago', 'Pagado', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
        default: 'Pendiente de Pago'
    },
    paymentMethod: { // Podría ser más complejo con detalles de pago
        type: String,
        trim: true,
        default: 'Simulado' // Para este proyecto, asumimos pagos simulados
    },
    paymentResult: { // Para guardar ID de transacción si se integrara un pago real
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    shippingAddress: { // Puede ser igual a la dirección de facturación o diferente
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    notes: { // Notas adicionales sobre el pedido
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;