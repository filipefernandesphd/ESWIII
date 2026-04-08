# # Listar todos os produtos
# GET /produtos

# # Buscar produto por id
# GET /produtos/:id

# # Filtrar produtos por categoria
# GET /produtos?categoria=...

# # Buscar produtos pelo nome
# GET /produtos?nome=...

# # Listar apenas produtos disponíveis em estoque
# GET /produtos?disponivel=true

# # Combinar filtros (categoria e disponibilidade)
# GET /produtos?categoria=...&disponivel=true

# # Listar produtos em destaque
# GET /produtos/destaques

# # Listar produtos mais recentes
# GET /produtos/novidades

# # Listar produtos em promoção
# GET /produtos/promocoes

# # Listar categorias de produtos
# GET /categorias

# 3. Feature: Coleções Especiais de Produtos
# 4. Feature: Categorias de Produtos


Feature: Catálogo de Produtos

  Como visitante do e-commerce
  Quero visualizar a lista de produtos disponíveis na loja
  Para decidir o que comprar

  Background:
    Given existem os seguintes produtos cadastrados

  Scenario: Visualizar lista de produtos
    When eu envio uma requisição GET de listagem de produtos para "/produtos"
    Then o status da resposta da listagem de produtos deve ser 200