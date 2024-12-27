import React from "react";

const Register = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registro enviado");
  };

  return (
    <div>
      <h1>Registrar</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome de usuário" required />
        <input type="password" placeholder="Senha" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
