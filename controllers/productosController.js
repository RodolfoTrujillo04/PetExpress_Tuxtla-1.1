const Producto = require('../models/Producto');

class ProductosController {
  async listar(req, res) {
    try {
      const productos = await Producto.listar();
      res.json(productos);
    } catch (error) {
      console.error('Error al listar productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const producto = await Producto.buscarPorId(id);
      
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      
      res.json(producto);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  }

  async crear(req, res) {
    try {
      const { nombre, descripcion, precio, stock, id_categoria, imagen_url, certificado_calidad } = req.body;
      
      if (!nombre || !precio || !id_categoria) {
        return res.status(400).json({ error: 'Nombre, precio y categoría son requeridos' });
      }
      
      const result = await Producto.crear({ 
        nombre, 
        descripcion, 
        precio, 
        stock: stock || 0, 
        id_categoria, 
        imagen_url, 
        certificado_calidad 
      });
      
      res.status(201).json({ 
        message: 'Producto creado exitosamente', 
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, stock, id_categoria, imagen_url, certificado_calidad } = req.body;
      
      const producto = await Producto.buscarPorId(id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      
      await Producto.actualizar(id, { 
        nombre, 
        descripcion, 
        precio, 
        stock, 
        id_categoria, 
        imagen_url, 
        certificado_calidad 
      });
      
      res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const producto = await Producto.buscarPorId(id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      
      await Producto.eliminar(id);
      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
}

module.exports = new ProductosController();