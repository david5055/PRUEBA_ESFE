const { poolConnect, sql, pool } = require('./db');

// Obtener todos los usuarios junto con sus roles
async function getUsersWithRoles() {
  await poolConnect;
  const result = await pool.request().query(`
    SELECT u.id, u.name, u.email, r.name AS role
    FROM users u
    JOIN roles r ON u.role_id = r.id
  `);
  return result.recordset;
}

// Obtener todos los roles
async function getRoles() {
  await poolConnect;
  const result = await pool.request().query('SELECT * FROM roles');
  return result.recordset;
}

// Crear nuevo usuario
async function createUser({ name, email, password, role_id }) {
  await poolConnect;
  const request = pool.request();
  request.input('name', sql.VarChar(100), name);
  request.input('email', sql.VarChar(150), email);
  request.input('password', sql.VarChar(255), password); // hash si aplica
  request.input('role_id', sql.Int, role_id);

  await request.query(`
    INSERT INTO users (name, email, password, role_id)
    VALUES (@name, @email, @password, @role_id)
  `);
}

// Obtener un usuario por ID
async function getUserById(id) {
  await poolConnect;
  const request = pool.request();
  request.input('id', sql.Int, id);

  const result = await request.query(`
    SELECT * FROM users WHERE id = @id
  `);

  return result.recordset[0];
}

// Obtener un usuario por email (para login)
async function getUserByEmail(email) {
  await poolConnect;
  const request = pool.request();
  request.input('email', sql.VarChar, email);

  const result = await request.query(`
    SELECT u.*, r.name AS role
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.email = @email
  `);

  return result.recordset[0];
}

// Actualizar usuario
async function updateUser(id, { name, email, role_id }) {
  await poolConnect;
  const request = pool.request();
  request.input('id', sql.Int, id);
  request.input('name', sql.VarChar(100), name);
  request.input('email', sql.VarChar(150), email);
  request.input('role_id', sql.Int, role_id);

  await request.query(`
    UPDATE users
    SET name = @name, email = @email, role_id = @role_id
    WHERE id = @id
  `);
}

// Eliminar usuario
async function deleteUser(id) {
  await poolConnect;
  const request = pool.request();
  request.input('id', sql.Int, id);

  await request.query('DELETE FROM users WHERE id = @id');
}

module.exports = {
  getUsersWithRoles,
  getRoles,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail // ✅ Exportado para login
};
