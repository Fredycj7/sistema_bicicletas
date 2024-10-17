import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
      <input type="email" placeholder="Correo" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
