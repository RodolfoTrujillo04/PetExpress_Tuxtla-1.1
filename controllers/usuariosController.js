const Usuario = require('../models/Usuario');

class UsuariosController {
  async listar(req, res) {
    try {
      console.log('Listando usuarios...');
      const usuarios = await Usuario.listar();
      console.log('Usuarios encontrados:', usuarios);
      res.json(usuarios);
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.buscarPorId(id);
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  }

  async crear(req, res) {
    try {
      const { email, password, rol, id_cliente, activo } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
      }

      // Verificar si el email ya existe
      const usuarioExistente = await Usuario.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }
      
      const result = await Usuario.crear({ 
        email, 
        password, 
        rol: rol || 'cliente', 
        id_cliente, 
        activo: activo !== undefined ? activo : true 
      });
      
      res.status(201).json({ 
        message: 'Usuario creado exitosamente', 
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { email, password, rol, id_cliente, activo } = req.body;
      
      const usuario = await Usuario.buscarPorId(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      const updateData = { email, rol, id_cliente, activo };
      
      // Solo actualizar password si se proporciona
      if (password) {
        updateData.password = password;
      }
      
      await Usuario.actualizar(id, updateData);
      
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const usuario = await Usuario.buscarPorId(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      // No permitir eliminar el propio usuario
      if (req.session.user && req.session.user.id == id) {
        return res.status(400).json({ error: 'No puedes eliminar tu propio usuario' });
      }
      
      await Usuario.eliminar(id);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
}

module.exports = new UsuariosController();