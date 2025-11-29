const db = require('../config/db');

class Mascota {
  static async listar() {
    const sql = `
      SELECT m.*, c.nombre as cliente_nombre, c.apellido as cliente_apellido 
      FROM Mascotas m 
      LEFT JOIN Clientes c ON m.id_cliente = c.id_cliente 
      ORDER BY m.nombre
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
      SELECT m.*, c.nombre as cliente_nombre, c.apellido as cliente_apellido 
      FROM Mascotas m 
      LEFT JOIN Clientes c ON m.id_cliente = c.id_cliente 
      WHERE m.id_mascota = ?
    `;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async crear(mascotaData) {
    const { nombre, tipo, raza, edad, id_cliente } = mascotaData;
    
    const sql = `INSERT INTO Mascotas (nombre, tipo, raza, edad, id_cliente) 
                 VALUES (?, ?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, tipo, raza, edad, id_cliente], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async actualizar(id, mascotaData) {
    const { nombre, tipo, raza, edad, id_cliente } = mascotaData;
    
    const sql = `UPDATE Mascotas 
                 SET nombre = ?, tipo = ?, raza = ?, edad = ?, id_cliente = ?
                 WHERE id_mascota = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, tipo, raza, edad, id_cliente, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async eliminar(id) {
    const sql = `DELETE FROM Mascotas WHERE id_mascota = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async listarPorCliente(id_cliente) {
    const sql = `SELECT * FROM Mascotas WHERE id_cliente = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id_cliente], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

module.exports = Mascota;