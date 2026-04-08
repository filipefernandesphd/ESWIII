import { Then, When } from "@cucumber/cucumber";
import request from "supertest";
import app from "../../../src/app";
import { expect } from "chai";

let response: request.Response

// Given está em shared.steps.ts para ser reutilizado em outros cenários de produtos

// Scenario: Listar produtos em destaque
// When eu envio uma requisição GET de coleções de produtos para "/produtos/destaques"
When("eu envio uma requisição GET de coleções de produtos para {string}", async function (endpoint: string) {
  response = await request(app).get(endpoint);
});

// Then o status da resposta da coleção de produtos deve ser 200
Then("o status da resposta da coleção de produtos deve ser {int}", function (statusCode: number) {
    expect(response.status).to.equal(statusCode);
});
