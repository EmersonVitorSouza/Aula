// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 5500;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sua_senha",
  database: "meu_banco_de_dados",
});

// Conexão ao banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados.");
});

// Middleware para JSON
app.use(bodyParser.json());

// Rota para cadastrar dados
app.post("/register", (req, res) => {
  const { cpf, name, password } = req.body;

  if (!cpf || !name || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  const sql = "INSERT INTO usuarios (cpf, nome, senha) VALUES (?, ?, ?)";
  db.query(sql, [cpf, name, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }

    res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// server.js

// Rota para listar usuários
app.get("/users", (req, res) => {
  const sql = "SELECT cpf, nome FROM usuarios";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao buscar usuários." });
    }

    res.status(200).json(results);
  });
});
