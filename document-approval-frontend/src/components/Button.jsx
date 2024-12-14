import React from "react";

const Button = ({ label, onClick, style, className }) => {
  const defaultStyle = {
    padding: "10px 20px",
    backgroundColor: "#5b35d0",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    ...style, // Permite sobrescrever o estilo
  };

  return (
    <button
      onClick={onClick}
      style={defaultStyle}
      className={className} // Permite passar uma classe CSS adicional
    >
      {label}
    </button>
  );
};

export default Button;
