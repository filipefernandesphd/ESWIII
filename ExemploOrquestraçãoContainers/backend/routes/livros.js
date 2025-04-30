var express = require('express');
var router = express.Router();

const connectToDatabase = require('../config/database');
const Livro = require('../models/Livro');

connectToDatabase();

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.find({});
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar livros.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.json(livro);
  } catch (err) {
  res.status(400).json({ erro: 'ID inválido ou erro ao buscar livro' });
  }
});

module.exports = router;
