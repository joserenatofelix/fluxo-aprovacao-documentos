import React, { useState } from 'react';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validação básica
    if (!formData.username || !formData.password || !formData.email) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await api.post('/register', formData);
      console.log('Usuário registrado com sucesso:', response.data);
      // Redirecionar ou mostrar mensagem de sucesso
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      setError('Erro ao registrar usuário. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Registro de Usuário</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
