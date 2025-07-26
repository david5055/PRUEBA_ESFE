const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

// Mostrar todos los roles
router.get('/', roleController.listRoles);

// Mostrar formulario para agregar rol
router.get('/new', roleController.showAddForm);

// Procesar creación de nuevo rol
router.post('/', roleController.createRole);

// Mostrar formulario para editar un rol
router.get('/edit/:id', roleController.showEditForm);

// Procesar la edición del rol
router.post('/edit/:id', roleController.updateRole);

// Eliminar un rol
router.post('/delete/:id', roleController.deleteRole); // ✅ Activa el botón "Eliminar"

module.exports = router;
