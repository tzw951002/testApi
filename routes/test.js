const express = require('express');
const router = express.Router();

router.put('/login', (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({error: 'Error'});
    }
    const result_str = username + password;
    const token = crypto.createHash('sha1').update(result_str).digest('hex');
    res.json({token:token});
});

router.put('/flag', (req, res) => {
    const {f1nat3xthd} = req.body;
    const {flag} = req.body;
    // if (!f1nat3xthd) {
    //     return res.status(400).json({ error: 'Not Found' });
    // }

    console.log(f1nat3xthd + "|" + flag);  // 打印出来就行，自己留着交
    res.status(200).json({status: 'ok'});
});


module.exports = router;