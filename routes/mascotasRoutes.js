const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => mascotasController.listar(req, res));
router.get('/:id', (req, res) => mascotasController.obtener(req, res));
router.get('/cliente/:id_cliente', (req, res) => mascotasController.listarPorCliente(req, res));
router.post('/', requireAuth, (req, res) => mascotasController.crear(req, res));
router.put('/:id', requireAuth, (req, res) => mascotasController.actualizar(req, res));
router.delete('/:id', requireAuth, (req, res) => mascotasController.eliminar(req, res));

module.exports = router;