const db = require('../config/db');

class Categoria {
  static async listar() {
    const sql = `SELECT * FROM Categorias ORDER BY nombre`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static async buscarPorId(id) {
    const sql = `SELECT * FROM Categorias WHERE id_categoria = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async crear(categoriaData) {
    const { nombre, descripcion } = categoriaData;
    
    const sql = `INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, descripcion], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async actualizar(id, categoriaData) {
    const { nombre, descripcion } = categoriaData;
    
    const sql = `UPDATE Categorias SET nombre = ?, descripcion = ? 
                 WHERE id_categoria = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [nombre, descripcion, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static async eliminar(id) {
    const sql = `DELETE FROM Categorias WHERE id_categoria = ?`;
    
    return new Promise((resolve, reject) => {
      db.execute(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = Categoria;