const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);

app.get('/api/test', (req, res) => {
  res.send('Conexão bem-sucedida!');
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
