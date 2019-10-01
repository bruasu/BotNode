const { Router } = require('express');
const router = Router();
const Fibo = require('../Indicators/fibonacci');

router.get('/:high/:low', (req, res) => {
    const high = req.params.high;
    const low = req.params.low;
    const result = Fibo.fibo(high, low);

    res.json(result);
});

module.exports = router;