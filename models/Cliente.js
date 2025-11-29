const db = require('../config/db');

class Cliente {
  static async listar() {
    const sql = `SELECT * FROM Clientes ORDER BY fecha_registro DESC`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async buscarPorId(id) {
    const sql = `SELECT * FROM Clientes WHERE id_cliente = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async crear(clienteData) {
    const { nombre, apellido, correo, telefono, direccion, ciudad } = clienteData;
    
    const sql = `INSERT INTO Clientes (nombre, apellido, correo, telefono, direccion, ciudad) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, apellido, correo, telefono, direccion, ciudad], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async actualizar(id, clienteData) {
    const { nombre, apellido, correo, telefono, direccion, ciudad } = clienteData;
    
    const sql = `UPDATE Clientes 
                 SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, ciudad = ?
                 WHERE id_cliente = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, apellido, correo, telefono, direccion, ciudad, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async eliminar(id) {
    const sql = `DELETE FROM Clientes WHERE id_cliente = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async buscarPorEmail(email) {
    const sql = `SELECT * FROM Clientes WHERE correo = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }
}

module.exports = Cliente;