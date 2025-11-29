const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function actualizarPasswords() {
  try {
    // Hash para la contraseña "123456"
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const sql = `UPDATE Usuarios SET password_hash = ? WHERE id_usuario IN (1, 2)`;
    
    db.execute(sql, [hashedPassword], (err, result) => {
      if (err) {
        console.error('Error actualizando passwords:', err);
      } else {
        console.log('Passwords actualizados exitosamente');
      }
      process.exit();
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

actualizarPasswords();