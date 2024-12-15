require('dotenv').config(); // Carregar variáveis do arquivo .env
const express = require('express');
const sequelize = require('./config/database');
const documentoRoutes = require('./routes/documentoRoutes');
const config = require('./config/config');

const app = express();
app.use(express.json()); // Para interpretar JSON no corpo da requisição

// Definindo rotas
app.use('/api', documentoRoutes);

// Conectar ao banco de dados e iniciar o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Banco de dados conectado');
    app.listen(config.port, () => {
      console.log(`Servidor rodando na porta ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
  });
