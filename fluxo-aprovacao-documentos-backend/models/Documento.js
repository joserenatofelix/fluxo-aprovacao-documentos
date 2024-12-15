const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Documento = sequelize.define('Documento', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comentarios: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  },
  anexo: {
    type: DataTypes.STRING, // Pode ser um caminho de arquivo ou URL
  }
});

module.exports = Documento;
