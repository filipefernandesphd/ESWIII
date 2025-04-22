var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3003/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários externos' });
  }
});

// users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`http://localhost:3003/users/${id}`);
    res.json(response.data);
  } catch (error) {
    // Se a API externa retornar 404, repassa esse status
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Outros erros (conexão, timeout, etc)
    console.error('Erro ao buscar usuário por ID:', error.message);
    res.status(500).json({ error: 'Erro ao buscar usuário externo' });
  }
});

// Exemplo de rota que consome uma API de CEP (teste mockado)
router.get('/register/postcode/:number', async (req, res) => {
  const { number } = req.params;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${number}/json/`);
    const data = response.data;

    const endereco = {
      rua: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf
    };

    res.json(endereco);
  } catch (error) {
    console.error('Erro ao buscar CEP:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados do CEP' });
  }
});

module.exports = router;
