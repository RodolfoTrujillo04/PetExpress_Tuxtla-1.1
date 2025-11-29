const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => pedidosController.listar(req, res));
router.get('/:id', (req, res) => pedidosController.obtener(req, res));
router.get('/cliente/:id_cliente', (req, res) => pedidosController.listarPorCliente(req, res));
router.post('/', requireAuth, (req, res) => pedidosController.crear(req, res));
router.put('/:id', requireAuth, (req, res) => pedidosController.actualizar(req, res));
router.delete('/:id', requireAuth, (req, res) => pedidosController.eliminar(req, res));

module.exports = router;