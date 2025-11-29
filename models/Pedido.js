const db = require('../config/db');

class Pedido {
  static async listar() {
    const sql = `
      SELECT p.*, c.nombre as cliente_nombre, c.apellido as cliente_apellido 
      FROM Pedidos p 
      LEFT JOIN Clientes c ON p.id_cliente = c.id_cliente 
      ORDER BY p.fecha DESC
    `;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async buscarPorId(id) {
    const sql = `
      SELECT p.*, c.nombre as cliente_nombre, c.apellido as cliente_apellido 
      FROM Pedidos p 
      LEFT JOIN Clientes c ON p.id_cliente = c.id_cliente 
      WHERE p.id_pedido = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async crear(pedidoData) {
    const { id_cliente, estado, total, metodo_pago } = pedidoData;
    
    const sql = `INSERT INTO Pedidos (id_cliente, estado, total, metodo_pago) 
                 VALUES (?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id_cliente, estado, total, metodo_pago], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async actualizar(id, pedidoData) {
    const { estado, total, metodo_pago } = pedidoData;
    
    const sql = `UPDATE Pedidos 
                 SET estado = ?, total = ?, metodo_pago = ?
                 WHERE id_pedido = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [estado, total, metodo_pago, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async eliminar(id) {
    const sql = `DELETE FROM Pedidos WHERE id_pedido = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async listarPorCliente(id_cliente) {
    const sql = `SELECT * FROM Pedidos WHERE id_cliente = ? ORDER BY fecha DESC`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id_cliente], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  // Detalles del pedido
  static async obtenerDetalles(id_pedido) {
    const sql = `
      SELECT dp.*, pr.nombre as producto_nombre, pr.precio 
      FROM Detalle_Pedido dp 
      LEFT JOIN Productos pr ON dp.id_producto = pr.id_producto 
      WHERE dp.id_pedido = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id_pedido], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async agregarDetalle(detalleData) {
    const { id_pedido, id_producto, cantidad, subtotal } = detalleData;
    
    const sql = `INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad, subtotal) 
                 VALUES (?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id_pedido, id_producto, cantidad, subtotal], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = Pedido;