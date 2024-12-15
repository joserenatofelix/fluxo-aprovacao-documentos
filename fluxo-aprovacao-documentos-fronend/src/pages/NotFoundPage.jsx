import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to="/" style={{ color: "#5b35d0", textDecoration: "underline" }}>
        Voltar para o início
      </Link>
    </div>
  );
};

export default NotFoundPage;
