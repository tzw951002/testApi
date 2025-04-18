const express = require('express');
const router = express.Router();

const billings = new Map(); // 用于存储 billing 数据


// POST /billings
router.post('/', (req, res) => {
    const { orderId, amount } = req.body;
    const id = "testtest";
    const billing = { id, orderId, amount };
    billings.set(id, billing);
    res.status(200).json(billing);
});

module.exports = router;