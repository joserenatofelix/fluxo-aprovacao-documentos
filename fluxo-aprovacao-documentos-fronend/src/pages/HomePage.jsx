import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header title="Bem-vindo ao Sistema" />
        <div style={{ padding: "20px" }}>
          <h2>Escolha uma opção no menu lateral.</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
