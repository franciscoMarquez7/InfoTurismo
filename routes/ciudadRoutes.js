const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/ciudadController');

router.get('/', ciudadController.getAllCiudad);
router.get('/:id', ciudadController.getCiudadById);
router.post('/', ciudadController.createCiudad);
router.delete('/:id', ciudadController.deleteCiudad);
router.put('/:id', ciudadController.updateCiudad);
router.get('/filtro/pais', ciudadController.getCiudadesByPais);


module.exports = router;