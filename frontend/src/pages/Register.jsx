import React, { useRef } from "react";
import "./../styles/Register.css";

const Register = () => {
  const formRef = useRef(null);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registro enviado");
  };

  const handleClose = () => {
    formRef.current.reset();
  };

  return (
    <div className="window">
      <div className="window-header">
        <h1>Cadastro de Novo Usuário</h1>
        <button onClick={handleClose}>X</button>
      </div>
      <form ref={formRef} onSubmit={handleRegister}>
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
