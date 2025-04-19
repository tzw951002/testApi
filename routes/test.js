const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const {orderBook} = require('../util/csv')
const {DateTime} = require("luxon");

// 3-2
router.put('/login', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Error'});
    }
    const result_str = username + password;
    const token = crypto.createHash('sha1').update(result_str).digest('hex');
    res.json({token: token});
});

// 3-2
router.put('/flag', (req, res) => {
    const {f1nat3xthd} = req.body;
    const {flag} = req.body;
    // if (!f1nat3xthd) {
    //     return res.status(400).json({ error: 'Not Found' });
    // }

    console.log(f1nat3xthd + "|" + flag);  // 打印出来就行，自己留着交
    res.status(200).json({status: 'ok'});
});

//3-3
router.get('/candle', (req, res) => {
    if (!orderBook || orderBook.size === 0) {
        return res.status(500).json({ error: 'Data Loading' });
    }
    const { code, year, month, day, hour } = req.query;
    const data = orderBook.get(code);

    if (!data) {
        return res.status(400).json({ error: 'Code not found' });
    }
    const start = DateTime.fromObject({
        year: Number(year),
        month: Number(month),
        day: Number(day),
        hour: Number(hour),
        zone: 'Asia/Tokyo'
    }).toJSDate();
    const end = new Date(start.getTime() + 60 * 60 * 1000 - 1);
    const prices = data
        .filter(entry => entry.time >= start && entry.time <= end)
        .map(entry => entry.price);

    if (prices.length === 0) {
        return res.status(400).json({ error: 'No Data' });
    }
    const result = {
        open: prices[0],
        high: Math.max(...prices),
        low: Math.min(...prices),
        close: prices[prices.length - 1]
    };
    res.status(200).json(result);
});


module.exports = router;