const Mascota = require('../models/Mascota');

class MascotasController {
  async listar(req, res) {
    try {
      const mascotas = await Mascota.listar();
      res.json(mascotas);
    } catch (error) {
      console.error('Error al listar mascotas:', error);
      res.status(500).json({ error: 'Error al obtener mascotas' });
    }
  }

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const mascota = await Mascota.buscarPorId(id);
      
      if (!mascota) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }
      
      res.json(mascota);
    } catch (error) {
      console.error('Error al obtener mascota:', error);
      res.status(500).json({ error: 'Error al obtener mascota' });
    }
  }

  async crear(req, res) {
    try {
      const { nombre, tipo, raza, edad, id_cliente } = req.body;
      
      if (!nombre || !tipo || !id_cliente) {
        return res.status(400).json({ error: 'Nombre, tipo y cliente son requeridos' });
      }
      
      const result = await Mascota.crear({ 
        nombre, 
        tipo, 
        raza, 
        edad: edad || 0, 
        id_cliente 
      });
      
      res.status(201).json({ 
        message: 'Mascota creada exitosamente', 
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error al crear mascota:', error);
      res.status(500).json({ error: 'Error al crear mascota' });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, tipo, raza, edad, id_cliente } = req.body;
      
      const mascota = await Mascota.buscarPorId(id);
      if (!mascota) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }
      
      await Mascota.actualizar(id, { 
        nombre, 
        tipo, 
        raza, 
        edad, 
        id_cliente 
      });
      
      res.json({ message: 'Mascota actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar mascota:', error);
      res.status(500).json({ error: 'Error al actualizar mascota' });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const mascota = await Mascota.buscarPorId(id);
      if (!mascota) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }
      
      await Mascota.eliminar(id);
      res.json({ message: 'Mascota eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar mascota:', error);
      res.status(500).json({ error: 'Error al eliminar mascota' });
    }
  }

  async listarPorCliente(req, res) {
    try {
      const { id_cliente } = req.params;
      const mascotas = await Mascota.listarPorCliente(id_cliente);
      res.json(mascotas);
    } catch (error) {
      console.error('Error al listar mascotas del cliente:', error);
      res.status(500).json({ error: 'Error al obtener mascotas del cliente' });
    }
  }
}

module.exports = new MascotasController();