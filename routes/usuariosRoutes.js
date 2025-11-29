const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, (req, res) => usuariosController.listar(req, res));
router.get('/:id', requireAuth, (req, res) => usuariosController.obtener(req, res));
router.post('/', requireAuth, (req, res) => usuariosController.crear(req, res));
router.put('/:id', requireAuth, (req, res) => usuariosController.actualizar(req, res));
router.delete('/:id', requireAuth, (req, res) => usuariosController.eliminar(req, res));

module.exports = router;