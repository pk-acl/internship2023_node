const express = require('express');
const router = express.Router()
const cors = require('cors');
router.use(cors());

const userController = require('../controllers/download');

router
    .get('/', userController.downloadFile);

module.exports = router;
