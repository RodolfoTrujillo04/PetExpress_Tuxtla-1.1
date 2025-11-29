const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Todas las rutas de admin requieren autenticación
router.use(requireAuth);

// Ruta de dashboard
router.get('/dashboard', (req, res) => {
    res.json({ message: 'Bienvenido al dashboard de admin' });
});

module.exports = router;