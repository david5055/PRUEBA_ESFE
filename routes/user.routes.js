const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

// Lista de usuarios
router.get('/', userCtrl.listUsers);

// Formulario para agregar nuevo usuario
router.get('/new', userCtrl.showAddForm);
router.post('/', userCtrl.createUser);

// Formulario para editar usuario
router.get('/edit/:id', userCtrl.showEditForm);

// Procesar edición de usuario
router.post('/edit/:id', userCtrl.updateUser);

// Eliminar usuario
router.post('/delete/:id', userCtrl.deleteUser);

module.exports = router;
