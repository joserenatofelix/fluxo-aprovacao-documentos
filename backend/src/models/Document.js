const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Document = sequelize.define('Document', {
  title: { type: DataTypes.STRING, allowNull: false },
  comments: { type: DataTypes.TEXT },
  filePath: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }, // 'pending', 'approved', 'rejected'
  area: { type: DataTypes.STRING } // Engenharia, RH, etc.
});

module.exports = Document;
