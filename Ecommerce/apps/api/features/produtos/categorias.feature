Feature: Categorias de Produtos

  Como visitante do e-commerce
  Quero visualizar as categorias de produtos disponíveis
  Para navegar com mais facilidade pelo catálogo

  Background:
    Given existem os seguintes produtos cadastrados

  Scenario: Visualizar lista de categorias
    When eu envio uma requisição GET de listagem de categorias para "/categorias"
    Then o status da resposta da listagem de categorias deve ser 200
