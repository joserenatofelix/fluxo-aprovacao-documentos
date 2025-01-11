import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import visibleIcon from "../assets/Visible.png";
import closedIcon from "../assets/closed.png";
import "./ResetPasswordForm.css"; // Importar o arquivo CSS

const ResetPasswordForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(location.state?.username || "");
  const [passwordReceived, setPasswordReceived] = useState(location.state?.passwordReceived || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/change-password", {
        username,
        passwordReceived,
        newPassword,
      });
      setMessage("Senha alterada com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Erro ao alterar a senha.");
    }
  };

  return (
    <div className="reset-form-container">
      <h2>Alterar Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Digite a senha recebida"
          value={passwordReceived}
          onChange={(e) => setPasswordReceived(e.target.value)}
          required
        />
        <div className="password-input-container">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Digite a nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <img
            src={showNewPassword ? visibleIcon : closedIcon}
            alt="Mostrar senha"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="password-toggle-icon"
          />
        </div>
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <img
            src={showConfirmPassword ? visibleIcon : closedIcon}
            alt="Mostrar senha"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="password-toggle-icon"
          />
        </div>
        <button type="submit">Alterar Senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordForm;
