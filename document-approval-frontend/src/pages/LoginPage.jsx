import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/LoginPage.css";
import loginImage from "../assets/login.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validação simples para exemplo
    if (username === "admin" && password === "1234") {
      alert("Login realizado com sucesso!");
      navigate("/home"); // Redireciona para a HomePage ou página após login
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h1>Sistema de fluxo de aprovação de documentos</h1>
          <h2>LOGIN</h2>
          <p>Seja bem-vindo de volta!</p>
          <form onSubmit={handleLogin}>
            <InputField
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button label="Conecte-se agora" />
          </form>
          <p className="signup-link">
            Não é cadastrado? <a href="#">Clique aqui!</a>
          </p>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Login Banner" />
          <h3>Muitos bons trabalhos estão esperando por você. Faça login agora!</h3>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
