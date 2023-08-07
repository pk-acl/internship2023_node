const express = require('express');
const router = express.Router()

const userController = require('../controllers/download');

router
    .get('/', userController.downloadFile);

module.exports = router;
