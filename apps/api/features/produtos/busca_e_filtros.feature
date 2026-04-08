Feature: Busca e Filtros de Produtos

  Como visitante do e-commerce
  Quero buscar e filtrar produtos
  Para encontrar com mais facilidade os itens que desejo comprar

  Background:
    Given existem os seguintes produtos cadastrados

  Scenario: Filtrar produtos por categoria
    When eu envio uma requisição GET de busca para "/produtos?categoria=Camisetas"
    Then o status da resposta da busca deve ser 200

  Scenario: Buscar produtos pelo nome
    When eu envio uma requisição GET de busca para "/produtos?nome=Camiseta"
    Then o status da resposta da busca deve ser 200

  Scenario: Listar apenas produtos disponíveis em estoque
    When eu envio uma requisição GET de busca para "/produtos?disponivel=true"
    Then o status da resposta da busca deve ser 200

  Scenario: Filtrar produtos por categoria e disponibilidade
    When eu envio uma requisição GET de busca para "/produtos?categoria=Camisetas&disponivel=true"
    Then o status da resposta da busca deve ser 200

  Scenario: Retornar lista vazia ao buscar categoria inexistente
    When eu envio uma requisição GET de busca para "/produtos?categoria=Acessorios"
    Then o status da resposta da busca deve ser 200

  Scenario: Retornar lista vazia ao buscar nome inexistente
    When eu envio uma requisição GET de busca para "/produtos?nome=Sapato"
    Then o status da resposta da busca deve ser 200