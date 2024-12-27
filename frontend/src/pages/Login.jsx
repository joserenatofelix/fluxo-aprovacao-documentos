import React, { useState } from "react";
import "../styles/Login.css";
import loginImage from "../assets/login.png";

const Login = () => {
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de verificação de credenciais
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username === "admin" && password === "admin") {
      setError(false);
      console.log("Formulário enviado");
      e.target.querySelector("button").classList.add("success");
    } else {
      setError(true);
      e.target.querySelector("button").classList.add("error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="blinking-text" style={{ textAlign: "center" }}>Aprovação de Documentos</h1>
        <h1>LOGIN</h1>
        <p>Seja bem-vindo de volta!!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nome de usuário</label>
            <input type="text" id="username" name="username" placeholder="Digite seu nome" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha de acesso</label>
            <input type="password" id="password" name="password" placeholder="Digite sua senha" />
          </div>
          <button type="submit">Conecte-se agora</button>
        </form>
        {error && <p style={{ color: "red" }}>Credenciais incorretas. Por favor, verifique-as e tente novamente!</p>}
        <p>
          Não é cadastrado? <a href="/register">Clique aqui!</a>
        </p>
      </div>
      <div className="login-image">
        <img src={loginImage} alt="Login" />
      </div>
    </div>
  );
};

export default Login;
