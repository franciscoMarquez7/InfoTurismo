// platoRoutes.js
const express = require('express');
const router = express.Router();
const monumentoController = require('../controllers/monumentoController');

router.get('/', monumentoController.getAllMonumento);
router.get('/:id', monumentoController.getMonumentoById);
router.post('/', monumentoController.createMonumento);
router.delete('/:id', monumentoController.deleteMonumento);
router.put('/:id', monumentoController.updateMonumento);
router.get('/filtro/nombre', monumentoController.getMonumentosByNombre);


module.exports = router;