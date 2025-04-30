const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  preco: Number,
  estoque: Number,
  imagem: String
});

module.exports = mongoose.model('Livro', LivroSchema, 'livros');