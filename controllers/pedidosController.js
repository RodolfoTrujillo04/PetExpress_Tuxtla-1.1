const Pedido = require('../models/Pedido');

class PedidosController {
  async listar(req, res) {
    try {
      const pedidos = await Pedido.listar();
      
      // Obtener detalles para cada pedido
      for (let pedido of pedidos) {
        pedido.detalles = await Pedido.obtenerDetalles(pedido.id_pedido);
      }
      
      res.json(pedidos);
    } catch (error) {
      console.error('Error al listar pedidos:', error);
      res.status(500).json({ error: 'Error al obtener pedidos' });
    }
  }

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const pedido = await Pedido.buscarPorId(id);
      
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      
      // Obtener detalles del pedido
      pedido.detalles = await Pedido.obtenerDetalles(id);
      
      res.json(pedido);
    } catch (error) {
      console.error('Error al obtener pedido:', error);
      res.status(500).json({ error: 'Error al obtener pedido' });
    }
  }

  async crear(req, res) {
    try {
      const { id_cliente, estado, total, metodo_pago, detalles } = req.body;
      
      if (!id_cliente || !total) {
        return res.status(400).json({ error: 'Cliente y total son requeridos' });
      }
      
      const result = await Pedido.crear({ 
        id_cliente, 
        estado: estado || 'Pendiente', 
        total, 
        metodo_pago 
      });
      
      const id_pedido = result.insertId;
      
      // Agregar detalles del pedido si existen
      if (detalles && Array.isArray(detalles)) {
        for (let detalle of detalles) {
          await Pedido.agregarDetalle({
            id_pedido,
            id_producto: detalle.id_producto,
            cantidad: detalle.cantidad,
            subtotal: detalle.subtotal
          });
        }
      }
      
      res.status(201).json({ 
        message: 'Pedido creado exitosamente', 
        id: id_pedido 
      });
    } catch (error) {
      console.error('Error al crear pedido:', error);
      res.status(500).json({ error: 'Error al crear pedido' });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { estado, total, metodo_pago } = req.body;
      
      const pedido = await Pedido.buscarPorId(id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      
      await Pedido.actualizar(id, { 
        estado, 
        total, 
        metodo_pago 
      });
      
      res.json({ message: 'Pedido actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      res.status(500).json({ error: 'Error al actualizar pedido' });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      const pedido = await Pedido.buscarPorId(id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' });
      }
      
      await Pedido.eliminar(id);
      res.json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      res.status(500).json({ error: 'Error al eliminar pedido' });
    }
  }

  async listarPorCliente(req, res) {
    try {
      const { id_cliente } = req.params;
      const pedidos = await Pedido.listarPorCliente(id_cliente);
      res.json(pedidos);
    } catch (error) {
      console.error('Error al listar pedidos del cliente:', error);
      res.status(500).json({ error: 'Error al obtener pedidos del cliente' });
    }
  }
}

module.exports = new PedidosController();