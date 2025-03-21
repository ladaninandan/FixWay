const express = require('express');
const router = express.Router();
const { addElectronicServiceData, allGetElectronicServiceData } = require('../controllers/AdminElectronicService');

router.post('/addElectronicServiceData', addElectronicServiceData);

router.get('/allGetElectronicServiceData/:serviceType?', allGetElectronicServiceData);

module.exports = router;