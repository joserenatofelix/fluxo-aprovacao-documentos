const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 5001; // Altere de 5000 para 5001

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

const Document = sequelize.define("Document", {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pendente",
  },
});

sequelize.sync();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const area = req.params.area;
    let folder = "uploads";
    switch (area) {
      case "Administracao":
        folder = "uploads/Administracao";
        break;
      case "Aeronautica":
        folder = "uploads/Aeronautica";
        break;
      case "Engenharia":
        folder = "uploads/Engenharia";
        break;
      case "RH":
        folder = "uploads/RH";
        break;
      case "TI":
        folder = "uploads/TI";
        break;
      default:
        folder = "uploads";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      res.status(200).json({ message: "Login bem-sucedido" });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Erro ao verificar credenciais:", error);
    res.status(500).json({ error: "Erro ao verificar credenciais" });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { area } = req.body;
    const newDocument = await Document.create({
      filename: req.file.filename,
      area,
    });
    res.status(200).json({ message: "Arquivo enviado com sucesso", document: newDocument });
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
    res.status(500).json({ error: "Erro ao enviar arquivo" });
  }
});

app.get("/documents", async (req, res) => {
  try {
    const { area } = req.query;
    const documents = await Document.findAll({ where: { area } });
    res.status(200).json(documents);
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    res.status(500).json({ error: "Erro ao buscar documentos" });
  }
});

app.post("/documents/:id/sign", async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (document) {
      document.status = "ok";
      await document.save();
      res.status(200).json({ message: "Documento assinado com sucesso" });
    } else {
      res.status(404).json({ error: "Documento não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao assinar documento:", error);
    res.status(500).json({ error: "Erro ao assinar documento" });
  }
});

app.post('/uploads/:area', upload.single('file'), (req, res) => {
  res.json({ message: 'Arquivo enviado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
