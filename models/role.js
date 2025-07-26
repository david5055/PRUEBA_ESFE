const { poolConnect, pool, sql } = require('./db');

// Obtener todos los roles
const getAllRoles = async () => {
  try {
    await poolConnect;
    const request = pool.request();
    const result = await request.query('SELECT * FROM roles');
    return result.recordset;
  } catch (err) {
    console.error('Error al obtener roles:', err);
    return [];
  }
};

// Crear un nuevo rol
const createRole = async (name) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('name', sql.VarChar, name);
    await request.query('INSERT INTO roles (name) VALUES (@name)');
  } catch (err) {
    console.error('Error al crear rol:', err);
    throw err;
  }
};

// Obtener un rol por ID
const getRoleById = async (id) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('id', sql.Int, id);
    const result = await request.query('SELECT * FROM roles WHERE id = @id');
    return result.recordset[0];
  } catch (err) {
    console.error('Error al obtener rol por ID:', err);
    return null;
  }
};

// Actualizar un rol existente
const updateRole = async (id, name) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('id', sql.Int, id);
    request.input('name', sql.VarChar, name);
    await request.query('UPDATE roles SET name = @name WHERE id = @id');
  } catch (err) {
    console.error('Error al actualizar rol:', err);
    throw err;
  }
};

// Eliminar un rol
const deleteRole = async (id) => {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('id', sql.Int, id);
    await request.query('DELETE FROM roles WHERE id = @id');
  } catch (err) {
    console.error('Error al eliminar rol:', err);
    throw err;
  }
};

module.exports = {
  getAllRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole
};
