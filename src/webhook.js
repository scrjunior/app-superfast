// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Main endpoint to receive BotPress data
app.post('/botpress-webhook', async (req, res) => {
  try {
    const leadData = req.body;
    
    // Log incoming data
    console.log('Received data from BotPress:', leadData);
    
    // Process the data as needed
    const processedData = {
      nome: leadData.nome,
      contacto: leadData.contacto,
      restaurante: leadData.restaurante,
      prato: leadData.prato,
      endereco: leadData.endereco,
      conversationId: leadData.conversationId,
      conversa: leadData.conversa,
      timestamp: new Date().toISOString()
    };
    
    // Here you can add your business logic
    // For example: save to database, send notifications, etc.
    
    // Send success response
    res.status(200).json({
      success: true,
      message: 'Data received and processed successfully',
      data: processedData
    });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing webhook',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});