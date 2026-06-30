# language: pt
Funcionalidade: Listagem de partidas da Copa do Mundo 2026
  Como usuário da API
  Quero consultar o endpoint /matches
  Para ver as partidas de cada grupo do torneio

  Cenário: Grupo A possui 6 partidas entre dois times
    Dado que a API está disponível
    Quando eu faço uma requisição GET para "/matches"
    Então a resposta deve ter status 200
    E o grupo "Group A" deve ter 6 partidas
    E cada partida do grupo "Group A" deve ser entre dois times diferentes
