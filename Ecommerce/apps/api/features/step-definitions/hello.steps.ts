// import { When, Then } from '@cucumber/cucumber';  // Importando os passos do Cucumber para definir as etapas dos testes
// import request from 'supertest';                  // Importando a biblioteca Supertest para fazer requisições HTTP e testar as respostas
// import { expect } from 'chai';                    // Importando a função expect do Chai (biblioteca de asserção)

// import app from '../../src/app';

// let response: request.Response;

// When(
//   'eu envio uma requisição GET para {string}',
//   async function (endpoint: string) {
//     response = await request(app).get(endpoint);
//   }
// );

// Then(
//   'o status da resposta deve ser {int}',
//   function (statusCode: number) {
//     expect(response.status).to.equal(statusCode);
//   }
// );