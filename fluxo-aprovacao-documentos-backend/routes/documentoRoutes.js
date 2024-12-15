const express = require('express');
const documentoController = require('../controllers/documentoController');
const router = express.Router();

router.post('/documentos', documentoController.create);
router.get('/documentos', documentoController.findAll);

module.exports = router;
