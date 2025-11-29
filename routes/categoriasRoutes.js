const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const { requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => categoriasController.listar(req, res));
router.get('/:id', (req, res) => categoriasController.obtener(req, res));
router.post('/', requireAuth, (req, res) => categoriasController.crear(req, res));
router.put('/:id', requireAuth, (req, res) => categoriasController.actualizar(req, res));
router.delete('/:id', requireAuth, (req, res) => categoriasController.eliminar(req, res));

module.exports = router;