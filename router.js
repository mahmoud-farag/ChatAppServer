
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    res.send('Welcome in our chat bot');
});


module.exports = router;