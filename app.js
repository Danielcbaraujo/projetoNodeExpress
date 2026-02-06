require("dotenv").config();
const express = require("express");
const app = express();

const sequelize = require("./models/db");
const Produto = require("./models/Produtos");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// CREATE
app.post("/cadastro", async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
app.get("/produtos", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.patch("/atualizar/:id", async (req, res) => {
  try {
    await Produto.update(req.body, { where: { id: req.params.id } });
    res.send("Produto atualizado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE
app.delete("/deletar/:id", async (req, res) => {
  try {
    await Produto.destroy({ where: { id: req.params.id } });
    res.send("Produto deletado com sucesso");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado com sucesso!");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar aplicação:", err);
  }
})();
