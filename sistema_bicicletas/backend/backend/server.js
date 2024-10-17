const express = require('express');
const app = express();

// Ruta básica que devuelve un mensaje
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
