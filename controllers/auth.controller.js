const User = require('../models/user'); // Usa tu modelo actual

// GET: Mostrar formulario de login
const showLoginForm = (req, res) => {
  res.render('login', {
    title: 'Iniciar Sesión',
    hideHeader: true // <- Esto oculta el menú/header desde layout.ejs
  });
};

// POST: Procesar login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.getUserByEmail(email);

    // Verificar credenciales
    if (!user || user.password !== password) {
      return res.render('login', {
        title: 'Iniciar Sesión',
        error: 'Credenciales inválidas',
        hideHeader: true
      });
    }

    // Guardar datos en la sesión
    req.session.user = {
      id: user.id,
      name: user.name,
      role: user.role // Asegúrate que getUserByEmail incluya el campo 'role'
    };

    // Redirigir según el rol
    if (user.role === 'Admin') {
      res.redirect('/admin');
    } else {
      res.redirect('/welcome');
    }

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).send('Error interno');
  }
};

// GET: Logout
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

module.exports = {
  showLoginForm,
  login,
  logout
};
