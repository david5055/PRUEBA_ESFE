const User = require('../models/user');

// Listar todos los usuarios con su rol
const listUsers = async (req, res) => {
  try {
    const users = await User.getUsersWithRoles();
    res.render('users', { title: 'Usuarios', users });
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Mostrar formulario para agregar nuevo usuario
const showAddForm = async (req, res) => {
  try {
    const roles = await User.getRoles();
    res.render('add-user', { title: 'Nuevo Usuario', roles });
  } catch (error) {
    console.error('Error al mostrar el formulario:', error);
    res.status(500).send('Error al mostrar formulario');
  }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;
    await User.createUser({ name, email, password, role_id });
    res.redirect('/users');
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error al crear el usuario');
  }
};

// Mostrar formulario para editar usuario
const showEditForm = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getUserById(id);
    const roles = await User.getRoles();

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.render('edit-user', { title: 'Editar Usuario', user, roles });
  } catch (error) {
    console.error('Error al cargar formulario de edición:', error);
    res.status(500).send('Error al cargar el formulario');
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, role_id } = req.body;

    await User.updateUser(id, { name, email, role_id });
    res.redirect('/users');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error al actualizar el usuario');
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await User.deleteUser(id);
    res.redirect('/users');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error al eliminar el usuario');
  }
};

module.exports = {
  listUsers,
  showAddForm,
  createUser,
  showEditForm,
  updateUser,
  deleteUser
};
