var express = require('express');
var router = express.Router();

const users = [
  { id: 1, name: 'Alice', email: 'alice@ifsudestemg.edu.br' },
  { id: 2, name: 'Bruno', email: 'bruno@ifsudestemg.edu.br' },
  { id: 3, name: 'Carla', email: 'carla@ifsudestemg.edu.br' },
  { id: 4, name: 'Daniel', email: 'daniel@ifsudestemg.edu.br' },
  { id: 5, name: 'Eduarda', email: 'eduarda@ifsudestemg.edu.br' }
];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

// Rota GET /users/:id -> retorna o usuário com o ID especificado
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id); // converte o id para número
  const user = users.find(u => u.id === userId); // procura o usuário na lista

  if (user) {
    res.json(user); // retorna o usuário encontrado
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' }); // se não encontrar
  }
});

module.exports = router;
