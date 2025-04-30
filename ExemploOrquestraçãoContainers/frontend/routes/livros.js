var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
        const response = await axios.get('http://backend-livro:3000/livros');  // Como todas as aplicações estão em containers, o acesso deve ser via nome do container e a porta interna

        const livros = response.data;
        res.render('livros', { livros });
    } catch (error) {
        res.status(500).send('Erro ao carregar os livros.');
    }
});

// Detalhes de um livro
router.get('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
      const response = await axios.get(`http://backend-livro:3000/livros/${id}`);
      res.render('livro', { livro: response.data });
    } catch (err) {
      console.error(err.message);
      res.status(404).send('Livro não encontrado');
    }
});

module.exports = router;
