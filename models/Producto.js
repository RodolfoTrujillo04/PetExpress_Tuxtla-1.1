const db = require('../config/db');

class Producto {
  static async listar() {
    const sql = `
      SELECT p.*, c.nombre as categoria_nombre 
      FROM Productos p 
      LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria 
      ORDER BY p.nombre
    `;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async buscarPorId(id) {
    const sql = `SELECT p.*, c.nombre as categoria_nombre 
                 FROM Productos p 
                 LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria 
                 WHERE p.id_producto = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async crear(productoData) {
    const { nombre, descripcion, precio, stock, id_categoria, imagen_url, certificado_calidad } = productoData;
    
    const sql = `INSERT INTO Productos (nombre, descripcion, precio, stock, id_categoria, imagen_url, certificado_calidad) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, descripcion, precio, stock, id_categoria, imagen_url, certificado_calidad || true], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async actualizar(id, productoData) {
    const { nombre, descripcion, precio, stock, id_categoria, imagen_url, certificado_calidad } = productoData;
    
    const sql = `UPDATE Productos 
                 SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, imagen_url = ?, certificado_calidad = ?
                 WHERE id_producto = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, descripcion, precio, stock, id_categoria, imagen_url, certificado_calidad, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async eliminar(id) {
    const sql = `DELETE FROM Productos WHERE id_producto = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = Producto;