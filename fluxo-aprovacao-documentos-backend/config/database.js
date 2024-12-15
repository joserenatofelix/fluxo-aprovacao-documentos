const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

// Configuração da conexão com o banco de dados PostgreSQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost', // Endereço do banco de dados
  dialect: 'postgres', // Dialeto do banco de dados (PostgreSQL)
  username: process.env.DB_USER, // Usuário do banco de dados
  password: process.env.DB_PASS, // Senha do banco de dados
  database: process.env.DB_NAME, // Nome do banco de dados
  port: process.env.DB_PORT || 5432, // Porta do banco de dados (padrão 5432)
  logging: false, // Desabilita o log de SQL (opcional)
  define: {
    freezeTableName: true, // Impede a modificação dos nomes das tabelas (mantém o nome no plural)
    timestamps: true, // Ativa a adição de campos de timestamp (createdAt, updatedAt)
  },
});

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = sequelize;
