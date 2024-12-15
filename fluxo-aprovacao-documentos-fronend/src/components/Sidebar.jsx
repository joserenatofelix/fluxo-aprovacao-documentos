import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav style={{ width: "250px", backgroundColor: "#f4f4f4", height: "100vh" }}>
      <ul style={{ listStyle: "none", padding: "20px" }}>
        <li><Link to="/upload">Anexar Documentos</Link></li>
        <li><Link to="/status">Status dos Documentos</Link></li>
        <li><Link to="/">Sair</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
