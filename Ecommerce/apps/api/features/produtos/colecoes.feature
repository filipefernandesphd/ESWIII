Feature: Coleções Especiais de Produtos

  Como visitante do e-commerce
  Quero visualizar coleções especiais de produtos
  Para encontrar com facilidade itens em destaque, novidades e promoções

  Background:
    Given existem os seguintes produtos cadastrados
  
  Scenario: Listar produtos em destaque
    When eu envio uma requisição GET de coleções de produtos para "/produtos/destaques"
    Then o status da resposta da coleção de produtos deve ser 200

  Scenario: Listar produtos em promoção
    When eu envio uma requisição GET de coleções de produtos para "/produtos/promocoes"
    Then o status da resposta da coleção de produtos deve ser 200

  Scenario: Listar produtos mais recentes
    When eu envio uma requisição GET de coleções de produtos para "/produtos/novidades"
    Then o status da resposta da coleção de produtos deve ser 200
