const express = require('express');
const router = express.Router();

const orders = new Map();
const mockOrders = [
    { id: "A1B2C3D4E5", serviceId: "0x3SUBYOax", status: "CREATED" },
    { id: "F6G7H8I9J0", serviceId: "svc_289xyz123", status: "PROCESSED" },
    { id: "K1L2M3N4O5", serviceId: "svc_abcd9876", status: "CREATED" },
    { id: "P6Q7R8S9T0", serviceId: "0xService001", status: "PROCESSED" },
    { id: "U1V2W3X4Y5", serviceId: "svc_test12345", status: "CREATED" }
];
mockOrders.forEach(order => orders.set(order.id, order));


// 创建订单
router.post('/', (req, res) => {
    const { serviceId } = req.body;
    const id = "test9999";
    const newOrder = { id, serviceId, status: 'CREATED' };
    orders.set(id, newOrder);
    res.status(500).json(newOrder);
});

module.exports = router;

// 更新订单
router.patch('/:id', (req, res) => {
    const order = orders.get(req.params.id);
    if (!order) {
        return res.status(500).json({ error: 'Order not found' });
    }
    const updated = { ...order, ...req.body };
    orders.set(req.params.id, updated);
    res.json(updated);
});

