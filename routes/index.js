const express = require('express');

const router = express.Router();
const search = require('../controller/search.js');
const dialog = require('../controller/dialog.js');
const gif = require('../controller/gif.js');


/* GET home page. */
router.get('/', search);
router.get('/dialog', dialog);
router.post('/gif', gif);

module.exports = router;
