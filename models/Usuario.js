const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Usuario {
  static async listar() {
    const sql = `SELECT u.*, c.nombre as cliente_nombre 
                 FROM Usuarios u 
                 LEFT JOIN Clientes c ON u.id_cliente = c.id_cliente 
                 ORDER BY u.id_usuario`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, (err, results) => {
        if (err) {
          console.error('Error en consulta SQL:', err);
          reject(err);
        } else {
          console.log('Resultados de usuarios:', results);
          resolve(results);
        }
      });
    });
  }

  static async buscarPorId(id) {
    const sql = `SELECT u.*, c.nombre as cliente_nombre 
                 FROM Usuarios u 
                 LEFT JOIN Clientes c ON u.id_cliente = c.id_cliente 
                 WHERE u.id_usuario = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async crear(usuarioData) {
    const { email, password, rol = 'cliente', id_cliente = null, activo = true } = usuarioData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = `INSERT INTO Usuarios (email, password_hash, rol, id_cliente, activo) 
                 VALUES (?, ?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [email, hashedPassword, rol, id_cliente, activo], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async buscarPorEmail(email) {
    const sql = `SELECT * FROM Usuarios WHERE email = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async compararPassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error('Error comparando passwords:', error);
      return false;
    }
  }

  static async actualizarConPassword(id, usuarioData) {
    const { email, password, rol, activo, id_cliente } = usuarioData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = `UPDATE Usuarios 
                 SET email = ?, password_hash = ?, rol = ?, activo = ?, id_cliente = ? 
                 WHERE id_usuario = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [email, hashedPassword, rol, activo, id_cliente, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async actualizar(id, usuarioData) {
    const { email, password, rol, activo, id_cliente } = usuarioData;
    
    if (password) {
      return await this.actualizarConPassword(id, usuarioData);
    } else {
      const sql = `UPDATE Usuarios 
                   SET email = ?, rol = ?, activo = ?, id_cliente = ? 
                   WHERE id_usuario = ?`;
      
      return new Promise((resolve, reject) => {
        db.execute(sql, [email, rol, activo, id_cliente, id], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    }
  }

  static async eliminar(id) {
    const sql = `DELETE FROM Usuarios WHERE id_usuario = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = Usuario;