const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => clientesController.listar(req, res));
router.get('/:id', (req, res) => clientesController.obtener(req, res));
router.post('/', requireAuth, (req, res) => clientesController.crear(req, res));
router.put('/:id', requireAuth, (req, res) => clientesController.actualizar(req, res));
router.delete('/:id', requireAuth, (req, res) => clientesController.eliminar(req, res));

module.exports = router;