const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sampleController');

// Routes for sample entity
router.get('/', sampleController.getAllSamples);
router.post('/', sampleController.createSample);

module.exports = router;
