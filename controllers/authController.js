const Usuario = require('../models/Usuario');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar campos requeridos
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      // Buscar usuario
      const usuario = await Usuario.buscarPorEmail(email);
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar contraseña
      const passwordValido = await Usuario.compararPassword(password, usuario.password_hash);
      if (!passwordValido) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar si está activo
      if (!usuario.activo) {
        return res.status(401).json({ error: 'Usuario inactivo' });
      }

      // Guardar en sesión
      req.session.user = {
        id: usuario.id_usuario,
        email: usuario.email,
        rol: usuario.rol,
        id_cliente: usuario.id_cliente
      };

      res.json({ 
        message: 'Login exitoso', 
        user: req.session.user 
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cerrar sesión' });
      }
      res.json({ message: 'Sesión cerrada exitosamente' });
    });
  }

  getCurrentUser(req, res) {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ error: 'No autenticado' });
    }
  }
}

module.exports = new AuthController();