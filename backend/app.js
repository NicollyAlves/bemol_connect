require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Rota para validação de CEP
app.post('/api/validate-cep', async (req, res) => {
  try {
    const { cep } = req.body;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: 'CEP inválido' });
  }
});

// Rota para criação de usuário
app.post('/api/users', (req, res) => {
  // Aqui você implementaria a lógica de salvar no banco de dados
  console.log('Usuário criado:', req.body);
  res.json({ message: 'Usuário criado com sucesso!', user: req.body });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});