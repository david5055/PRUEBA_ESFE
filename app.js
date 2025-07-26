const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(expressLayouts);
app.set('layout', 'layout'); 

// Middleware para formularios HTML
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (ej: /public/styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de sesión
app.use(session({
  secret: 'clave_secreta_segura',
  resave: false,
  saveUninitialized: false
}));

// Middleware global para pasar variables a TODAS las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.hideHeader = false; // valor por defecto
  next();
});

// Middleware para proteger rutas privadas
function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

// Rutas
const roleRoutes = require('./routes/roles.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/', authRoutes);
app.use('/roles', requireLogin, roleRoutes);
app.use('/users', requireLogin, userRoutes);

// Ruta raíz: redirige según el rol
app.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  if (req.session.user.role === 'Admin') {
    res.render('admin', { title: 'Panel Admin' });
  } else {
    res.redirect('/welcome');
  }
});

// Ruta para usuario no administrador
app.get('/welcome', requireLogin, (req, res) => {
  res.locals.hideHeader = true; // 
  res.render('welcome', { title: 'Bienvenido' });
});

// Ruta para panel administrador
app.get('/admin', requireLogin, (req, res) => {
  if (req.session.user.role !== 'Admin') {
    return res.status(403).send('Acceso denegado');
  }
  res.render('admin', { title: 'Panel Admin' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
