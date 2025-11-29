const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => productosController.listar(req, res));
router.get('/:id', (req, res) => productosController.obtener(req, res));
router.post('/', requireAuth, (req, res) => productosController.crear(req, res));
router.put('/:id', requireAuth, (req, res) => productosController.actualizar(req, res));
router.delete('/:id', requireAuth, (req, res) => productosController.eliminar(req, res));

module.exports = router;