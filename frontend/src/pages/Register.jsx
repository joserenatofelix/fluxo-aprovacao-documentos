import React from "react";
import "./../styles/Register.css";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registro enviado");
  };

  return (
    <div>
      <h1>Registrar</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome completo" required />
        <input type="text" placeholder="Nome de usuário" required />
        <input type="password" placeholder="Senha" required />
        <input type="email" placeholder="E-mail" required />
        <input type="text" placeholder="CPF" required />
        <input type="text" placeholder="Função" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
