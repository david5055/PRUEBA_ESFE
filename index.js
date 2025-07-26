const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // Usa views/layout.ejs

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas del sistema
const roleRoutes = require('./routes/roles.routes');
const userRoutes = require('./routes/user.routes');

// Usar las rutas
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);

// Ruta principal redirige al panel admin
app.get('/', (req, res) => {
  res.render('admin', { title: 'Panel de Administración' });
});

// Ruta admin directa (opcional, ya es la raíz también)
app.get('/admin', (req, res) => {
  res.render('admin', { title: 'Panel de Administración' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
