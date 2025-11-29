const Cliente = require('../models/Cliente');

class ClientesController {
  async listar(req, res) {
    try {
      const clientes = await Cliente.listar();
      res.json(clientes);
    } catch (error) {
      console.error('Error al listar clientes:', error);
      res.status(500).json({ error: 'Error al obtener clientes' });
    }
  }

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.buscarPorId(id);
      
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      
      res.json(cliente);
    } catch (error) {
      console.error('Error al obtener cliente:', error);
      res.status(500).json({ error: 'Error al obtener cliente' });
    }
  }

  async crear(req, res) {
    try {
      const { nombre, apellido, correo, telefono, direccion, ciudad } = req.body;
      
      if (!nombre || !correo) {
        return res.status(400).json({ error: 'Nombre y correo son requeridos' });
      }

      // Verificar si el correo ya existe
      const clienteExistente = await Cliente.buscarPorEmail(correo);
      if (clienteExistente) {
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }
      
      const result = await Cliente.crear({ 
        nombre, 
        apellido, 
        correo, 
        telefono, 
        direccion, 
        ciudad 
      });
      
      res.status(201).json({ 
        message: 'Cliente creado exitosamente', 
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error al crear cliente:', error);
      res.status(500).json({ error: 'Error al crear cliente' });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, apellido, correo, telefono, direccion, ciudad } = req.body;
      
      const cliente = await Cliente.buscarPorId(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      
      await Cliente.actualizar(id, { 
        nombre, 
        apellido, 
        correo, 
        telefono, 
        direccion, 
        ciudad 
      });
      
      res.json({ message: 'Cliente actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      res.status(500).json({ error: 'Error al actualizar cliente' });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const cliente = await Cliente.buscarPorId(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      
      await Cliente.eliminar(id);
      res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  }
}

module.exports = new ClientesController();