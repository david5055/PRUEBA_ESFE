const Role = require('../models/role');

// Lista todos los roles
const listRoles = async (req, res) => {
  try {
    const roles = await Role.getAllRoles();
    res.render('roles', { title: 'Lista de Roles', roles });
  } catch (error) {
    console.error('Error al listar roles:', error);
    res.status(500).send('Error al obtener los roles');
  }
};

// Muestra el formulario para agregar un nuevo rol
const showAddForm = (req, res) => {
  res.render('add-role', { title: 'Nuevo Rol' });
};

// Crea un nuevo rol
const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    await Role.createRole(name);
    res.redirect('/roles');
  } catch (error) {
    console.error('Error al crear el rol:', error);
    res.status(500).send('Error al crear el rol');
  }
};

// Muestra el formulario para editar un rol
const showEditForm = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const role = await Role.getRoleById(id);

    if (!role) {
      return res.status(404).send('Rol no encontrado');
    }

    res.render('edit-role', { title: 'Editar Rol', role });
  } catch (error) {
    console.error('Error al mostrar el formulario de edición:', error);
    res.status(500).send('Error al cargar el formulario');
  }
};

// Actualiza un rol existente
const updateRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    await Role.updateRole(id, name);
    res.redirect('/roles');
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).send('Error al actualizar el rol');
  }
};

// Elimina un rol
const deleteRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Role.deleteRole(id);
    res.redirect('/roles');
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    res.status(500).send('Error al eliminar el rol');
  }
};

module.exports = {
  listRoles,
  showAddForm,
  createRole,
  showEditForm,
  updateRole,
  deleteRole // ✅ importante exportarlo
};
