const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const webhookUrl = "https://webhook.botpress.cloud/bfe9fe59-c79d-4072-a651-7cb829e06108";

app.post('/send-message', async (req, res) => {
  try {
    const response = await axios.post(webhookUrl, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
