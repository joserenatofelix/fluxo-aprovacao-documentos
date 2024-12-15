import React from "react";
import "./styles/DocumentCard.css";

const DocumentCard = ({ document }) => {
  return (
    <div className="document-card">
      <div className="document-card-header">
        <h3>{document.name}</h3>
        <span className={`status ${document.status.toLowerCase()}`}>
          {document.status}
        </span>
      </div>
      <div className="document-card-body">
        <p>{document.description}</p>
        <a href={document.link} className="document-link" target="_blank" rel="noopener noreferrer">
          Baixar Documento
        </a>
      </div>
      <div className="document-card-footer">
        <button className="approve">Aprovar</button>
        <button className="reject">Rejeitar</button>
      </div>
    </div>
  );
};

export default DocumentCard;
