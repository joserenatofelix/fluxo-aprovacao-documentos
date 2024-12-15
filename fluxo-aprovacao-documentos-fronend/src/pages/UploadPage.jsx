import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import InputField from "../components/InputField";
import Button from "../components/Button";

const UploadPage = () => {
  const [documentName, setDocumentName] = useState("");
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Documento enviado para aprovação!");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header title="Anexar Documentos" />
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <InputField
            type="text"
            placeholder="Nome do documento"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Comentários"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ margin: "10px 0" }}
          />
          <Button label="Enviar Documento" />
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
