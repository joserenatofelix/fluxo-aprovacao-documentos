import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Register.css";

const Register = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Cadastro de Usuario efetuado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        formRef.current.reset();
      } else {
        const errorData = await response.json();
        console.error("Erro ao enviar registro:", errorData);
      }
    } catch (error) {
      console.error("Erro ao enviar registro", error);
    }
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
        <input name="fullName" type="text" placeholder="Nome completo" required />
        <input name="username" type="text" placeholder="Nome de usuário" required />
        <input name="password" type="password" placeholder="Senha" required />
        <input name="email" type="email" placeholder="E-mail" required />
        <input name="cpf" type="text" placeholder="CPF" required />
        <input name="role" type="text" placeholder="Função" required />
        <button type="submit">Registrar</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default Register;
