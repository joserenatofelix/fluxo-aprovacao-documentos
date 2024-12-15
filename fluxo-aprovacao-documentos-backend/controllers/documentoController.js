const Documento = require('../models/Documento');
const documentoService = require('../services/documentoService');

// Criação de documento
exports.create = async (req, res) => {
  try {
    const documento = await documentoService.createDocumento(req.body);
    res.status(201).json(documento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar documentos
exports.findAll = async (req, res) => {
  try {
    const documentos = await documentoService.getDocumentos();
    res.status(200).json(documentos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
