const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para interpretar dados URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para interpretar texto puro
app.use(bodyParser.text());

// Endpoint para receber dados gerais em JSON
app.post('/pedidos', (req, res) => {
  try {
    const { first, last, contacto, restaurante, conversaID } = req.body;

    // Log para depuração
    console.log("Dados recebidos:", { first, last, contacto, restaurante, conversaID });

    res.status(200).send({ message: "Dados recebidos com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    res.status(400).send({ error: "Erro ao processar a requisição" });
  }
});

// Endpoint para receber somente a conversa
app.post('/conversas', (req, res) => {
  try {
    
    const rawConversa = req.body; // Para texto puro

    // Log para depuração
    console.log("Conversa recebida:", {
      
      conversa: rawConversa
    });

    res.status(200).send({ message: "Conversa recebida com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar a conversa:", error);
    res.status(400).send({ error: "Erro ao processar a conversa" });
  }
});

// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
