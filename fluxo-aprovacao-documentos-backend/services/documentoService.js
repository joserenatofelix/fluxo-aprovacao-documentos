const Documento = require('../models/Documento');

exports.createDocumento = async (documentoData) => {
  try {
    const documento = await Documento.create(documentoData);
    return documento;
  } catch (error) {
    throw new Error('Erro ao criar documento: ' + error.message);
  }
};

exports.getDocumentos = async () => {
  try {
    return await Documento.findAll();
  } catch (error) {
    throw new Error('Erro ao buscar documentos: ' + error.message);
  }
};
