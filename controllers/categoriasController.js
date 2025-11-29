const Categoria = require('../models/Categoria');

class CategoriasController {
  async listar(req, res) {
    try {
      const categorias = await Categoria.listar();
      res.json(categorias);
    } catch (error) {
      console.error('Error al listar categorías:', error);
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  }

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.buscarPorId(id);
      
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      
      res.json(categoria);
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      res.status(500).json({ error: 'Error al obtener categoría' });
    }
  }

  async crear(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      
      if (!nombre) {
        return res.status(400).json({ error: 'El nombre es requerido' });
      }
      
      const result = await Categoria.crear({ nombre, descripcion });
      res.status(201).json({ 
        message: 'Categoría creada exitosamente', 
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error al crear categoría:', error);
      res.status(500).json({ error: 'Error al crear categoría' });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
      
      const categoria = await Categoria.buscarPorId(id);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      
      await Categoria.actualizar(id, { nombre, descripcion });
      res.json({ message: 'Categoría actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      res.status(500).json({ error: 'Error al actualizar categoría' });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const categoria = await Categoria.buscarPorId(id);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      
      await Categoria.eliminar(id);
      res.json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      res.status(500).json({ error: 'Error al eliminar categoría' });
    }
  }
}

module.exports = new CategoriasController();