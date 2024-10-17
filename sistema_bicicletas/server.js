const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',  // Cambia 'password' por tu contraseña real
  database: 'sistema_bicicletas'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Ruta para registrar usuarios
app.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Encriptamos la contraseña
    const result = await db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para login de usuarios
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const user = result[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
