const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const crypto = require("crypto"); // Para gerar tokens de redefinição
const nodemailer = require("nodemailer"); // Para envio de e-mails

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

app.post("/reset-password", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user) {
      // Lógica para enviar email de redefinição de senha
      res.status(200).json({ message: "Solicitação de redefinição de senha enviada com sucesso." });
    } else {
      res.status(404).json({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao enviar solicitação de redefinição de senha:", error);
    res.status(500).json({ error: "Erro ao enviar solicitação de redefinição de senha." });
  }
});

app.post('/uploads/:area', upload.single('file'), (req, res) => {
  res.json({ message: 'Arquivo enviado com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


// Configuração do transporte de e-mails (substitua pelos seus dados)
const transporter = nodemailer.createTransport({
  service: "gmail", // Altere para o serviço de e-mail desejado
  auth: {
    user: "seuemail@gmail.com", // Seu e-mail
    pass: "suasenha", // Sua senha ou token de aplicativo
  },
});

// Adicionar campo "resetToken" ao modelo User se ainda não existir
(async () => {
  if (!User.rawAttributes.resetToken) {
    await sequelize.getQueryInterface().addColumn("Users", "resetToken", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  }
})();

// Endpoint para solicitar redefinição de senha
app.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetToken = resetToken;
      await user.save();

      const resetLink = `http://localhost:3000/reset-password-form?token=${resetToken}`;
      await transporter.sendMail({
        from: "seuemail@gmail.com",
        to: email,
        subject: "Redefinição de Senha",
        text: `Clique no link para redefinir sua senha: ${resetLink}`,
      });

      res.status(200).json({ message: "E-mail de redefinição de senha enviado." });
    } else {
      res.status(404).json({ error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    res.status(500).json({ error: "Erro ao solicitar redefinição de senha." });
  }
});

// Endpoint para redefinir a senha com base no token
app.post("/reset-password/confirm", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ where: { resetToken: token } });

    if (user) {
      user.password = newPassword; // Certifique-se de usar hash de senha em produção
      user.resetToken = null;
      await user.save();

      res.status(200).json({ message: "Senha redefinida com sucesso." });
    } else {
      res.status(404).json({ error: "Token inválido ou expirado." });
    }
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ error: "Erro ao redefinir senha." });
  }
});