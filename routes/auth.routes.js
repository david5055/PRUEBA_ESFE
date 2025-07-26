const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Formulario login
router.get('/login', authController.showLoginForm);

// Procesar login
router.post('/login', authController.login);

// Cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;
