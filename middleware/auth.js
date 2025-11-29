function requireAuth(req, res, next) {
  if (req.session.user && req.session.user.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado. Se requiere autenticación de administrador.' });
  }
}

function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ error: 'Por favor inicia sesión' });
  }
}

module.exports = { requireAuth, requireLogin };