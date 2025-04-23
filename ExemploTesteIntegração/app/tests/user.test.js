const request = require('supertest');
const app = require('../app');
const axios = require('axios'); // usa-se para consumir endpoints

// USANDO O SUPERTEST
// Plano de testes que possui 3 casos de testes que utilizam o Supertest
// O Supertest é usando para testar conumo a endpoints que não exigem a execução da aplicação que está sendo desenvolvida.

// Define um conjunto de testes agrupados com o nome 'GET /users (com dados externos)'
describe('GET /users (com dados externos)', () => {

  // Define um teste individual com descrição clara do que será verificado
  it('deve retornar usuários vindos de uma API externa', async () => {

    const response = await request(app).get('/users'); // Envia uma requisição GET para o endpoint /users da aplicação local

    expect(response.statusCode).toBe(200); // Verifica se o status HTTP retornado foi 200 (OK)
    expect(Array.isArray(response.body)).toBe(true); // Verifica se o corpo da resposta é um array (esperado para uma lista de usuários)
    expect(response.body.length).toBeGreaterThan(0); // Garante que o array não está vazio (ou seja, há pelo menos um usuário retornado)
    expect(response.body[0]).toHaveProperty('id'); // Verifica se o primeiro objeto do array possui a propriedade 'id'
    expect(response.body[0]).toHaveProperty('name'); // Verifica se o primeiro objeto possui a propriedade 'name'
    expect(response.body[0]).toHaveProperty('email'); // Verifica se o primeiro objeto possui a propriedade 'email'
  });

  it('deve retornar um único usuário quando o ID existir', async () => { // define o primeiro teste
    const response = await request(app).get('/users/1'); // faz requisição GET para /users/1 (deve retornar Alice)

    expect(response.statusCode).toBe(200); // verifica se o status retornado é 200 OK
    expect(response.body).toHaveProperty('id', 1); // verifica se o objeto retornado tem a propriedade 'id' igual a 1
    expect(response.body).toHaveProperty('name');  // verifica se existe a propriedade 'name'
    expect(response.body).toHaveProperty('email'); // verifica se existe a propriedade 'email'
  });

  it('deve retornar 404 quando o usuário não existir', async () => { // define o segundo teste
    const response = await request(app).get('/users/999'); // faz requisição para um ID inexistente

    expect(response.statusCode).toBe(404);                            // espera que o status seja 404 Not Found
    expect(response.body).toHaveProperty('error', 'Usuário não encontrado'); // verifica se o corpo da resposta tem a mensagem de erro esperada
  });
});

// USANDO O MOCK NO AXIOS
// Plano de teste que possui 1 caso de teste que mocka o consumo ao serviço de CEP
describe('GET /users/register/postcode/:number', () => {
  it('deve retornar os dados de endereço mockados a partir do número do CEP', async () => {
    // Mocka o axios apenas neste teste
    const mock = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        logradouro: 'Rua Fictícia',
        bairro: 'Centro',
        localidade: 'Cidade Exemplo',
        uf: 'EX'
      }
    });

    const response = await request(app).get('/users/register/postcode/12345678');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      rua: 'Rua Fictícia',
      bairro: 'Centro',
      cidade: 'Cidade Exemplo',
      estado: 'EX'
    });

    mock.mockRestore(); // Restaura o comportamento original do axios
  });
});