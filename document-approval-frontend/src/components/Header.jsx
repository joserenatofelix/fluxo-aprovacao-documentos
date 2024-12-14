import React from "react";

const Header = ({ title }) => {
  return (
    <header style={{ padding: "20px", backgroundColor: "#5b35d0", color: "#fff" }}>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
