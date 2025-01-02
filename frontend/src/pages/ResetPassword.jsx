import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ResetPassword.css";
import logoImage from "../assets/logo.png";

const ResetPassword = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar solicitação de redefinição de senha
    console.log("Redefinir senha para:", username);
  };

  return (
    <div className="form-container">
      <img src={logoImage} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Nome de usuário</label>
          <div className="input-container">
            <i className="user-icon"></i>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="form-button">Redefinir senha</button>
      </form>
      <p>
        <Link to="/login" className="cancel-link">Cancelar</Link>
      </p>
    </div>
  );
};

export default ResetPassword;
