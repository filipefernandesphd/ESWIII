## Behavior-Driven Development (BDD)

BDD (Behavior-Driven Development) é uma abordagem de desenvolvimento de software que define e valida o comportamento do sistema por meio de exemplos descritos em linguagem próxima à linguagem natural, promovendo colaboração entre negócio, desenvolvimento e testes.

> BDD é uma forma de **desenvolver software a partir do comportamento esperado do sistema**, descrito de maneira clara e compreensível para todos os envolvidos.

**Principais caraterísticas**
- Começa pelo comportamento esperado e depois na construção de código;
- Utiliza linguagem próxima ao natural (**Gherkin**);
- Facilita a comunicação entre os stakeholders (cliente, desenvolvedores e testadores);
- Os cenários servem como uma espécie de documentação e viram testes de aceitação.

### Gherkin

Gherkin é a linguagem que permite escrever cenários de comportamento de forma clara, padronizada e automatizável no BDD.

**Estrutura básica:**
```gherkin
Feature: descreve a funcionalidade do sistema

Scenario: descreve um comportamento específico
  Given contexto inicial (Dado)
  When ação do usuário (Quando)
  Then resultado esperado (Então)
```

**Exemplo:**

```gherkin
Feature: Login

Scenario: Login com sucesso
  Given que o usuário está na página de login
  When ele informa credenciais válidas
  Then ele deve acessar o sistema
```

**Outras palavras-chave**

- `AND`: usado para continuar a mesma ideia da linha anterior
  ```gherkin
  Scenario: Finalizar compra
    Given que o usuário está logado
    And possui produtos no carrinho
    When ele finaliza a compra
    Then o pedido deve ser confirmado
    And o estoque deve ser atualizado
  ```

- `BUT`: usado para indicar uma exceção ou restrição
  ```gherkin
  Scenario: Pagamento não realizado
    Given que o usuário está logado
    And possui saldo insuficiente
    When ele tenta realizar o pagamento
    Then o sistema deve recusar a compra
    But deve manter os produtos no carrinho
  ```

**Exemplo**

```gherkin
Feature: Login

  Scenario: Login com sucesso
    Given que o usuário está na página de login
    And possui uma conta cadastrada no sistema
    When ele informa usuário e senha válidos
    Then ele deve acessar o sistema
    And deve visualizar a página inicial

  Scenario: Login sem sucesso
    Given que o usuário está na página de login
    And possui uma conta cadastrada no sistema
    When ele informa usuário ou senha inválidos
    Then o sistema deve exibir uma mensagem de erro
    And o usuário não deve acessar o sistema
```

### Features + Histórias de Usuários

Pode-se utilizar histórias de usuário para enriquecer a feature.

```gherkin
Feature: Realizar Login

  AS A (como um) cliente,
  I WANT TO (eu quero) realizar login no sistema,
  SO THAT (para que) eu possa acessar minha conta.

  Scenario: Login com sucesso (main flow)
    Given que o usuário está na página de login
    And possui uma conta cadastrada
    When ele informa usuário e senha válidos
    Then ele deve acessar o sistema

  Scenario: Login sem sucesso (alternative flow)
    Given que o usuário está na página de login
    And possui uma conta cadastrada
    When ele informa usuário ou senha inválidos
    Then o sistema deve exibir uma mensagem de erro
    And o usuário não deve acessar o sistema
```

### Background: reuso de contexto para vários cenários

**Exemplo 1**

```gherkin
Feature: Login

Background:
  Given que o usuário está na página de login
  And possui uma conta cadastrada

Scenario: Login com sucesso
  When ele informa credenciais válidas
  Then ele acessa o sistema

Scenario: Login com erro
  When ele informa credenciais inválidas
  Then o sistema exibe erro
```

**Exemplo 2**

```gherkin
Feature: Cadastro de produtos

  Background:
    Given que existem os seguintes produtos cadastrados:
      | nome       | preco | estoque |
      | Camisa     | 50    | 10      |
      | Calça      | 100   | 5       |
      | Tênis      | 200   | 0       |

  Scenario: Listar produtos disponíveis
    When o usuário solicita a lista de produtos
    Then o sistema deve retornar os produtos disponíveis em estoque

  Scenario: Verificar produto sem estoque
    When o usuário consulta o produto "Tênis"
    Then o sistema deve informar que o produto está indisponível

  Scenario: Consultar produto existente
    When o usuário consulta o produto "Camisa"
    Then o sistema deve exibir os dados do produto
```


### Resumo
- Foco no comportamento do sistema do ponto de vista do usuário;
- Linguagem próxima do negócio (Gherkin);
- Cenários viram testes de aceitação.