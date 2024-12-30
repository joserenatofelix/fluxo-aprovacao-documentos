const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize("fluxo_aprovacao", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

app.post("/register", async (req, res) => {
  try {
    const { fullName, username, password, email, cpf, role } = req.body;
    console.log("Dados recebidos:", { fullName, username, password, email, cpf, role });
    const newUser = await User.create({ fullName, username, password, email, cpf, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
