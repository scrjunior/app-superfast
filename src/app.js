const readline = require('readline');
const axios = require('axios');

// Confi terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// URL webhook
const webhookUrl = "https://webhook.botpress.cloud/bfe9fe59-c79d-4072-a651-7cb829e06108";

// Função para enviar a mensagem ao webhook
function sendMessage(conversationId, content) {
  const payload = {
    conversationId,
    content
  };

  axios.post(webhookUrl, payload, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(() => {
    console.log("Mensagem enviada com sucesso!");
  })
  .catch(error => {
    console.error("Erro ao enviar a mensagem:", error.message);
  });
}


rl.question('Digite o ID da conversa: ', conversationId => {
  rl.question('Digite a mensagem a ser enviada: ', content => {
    sendMessage(conversationId, content);
    rl.close();
  });
});
