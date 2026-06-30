import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert';
import { ApiWorld } from '../support/world';

Given('que a API está disponível', async function (this: ApiWorld) {
  const response = await fetch(`${this.apiUrl}/health`);
  assert.strictEqual(
    response.status,
    200,
    `API indisponível em ${this.apiUrl}. Suba os containers antes de rodar os testes.`
  );
});

When(
  'eu faço uma requisição GET para {string}',
  async function (this: ApiWorld, path: string) {
    this.response = await fetch(`${this.apiUrl}${path}`);
    this.tournament = await this.response.json();
  }
);

Then(
  'a resposta deve ter status {int}',
  function (this: ApiWorld, status: number) {
    assert.ok(this.response, 'Nenhuma resposta recebida');
    assert.strictEqual(this.response.status, status);
  }
);

Then(
  'o grupo {string} deve ter {int} partidas',
  function (this: ApiWorld, group: string, count: number) {
    assert.ok(this.tournament, 'Nenhum torneio recebido');
    const groupMatches = this.tournament.matches.filter(
      (m) => m.group === group
    );
    assert.strictEqual(
      groupMatches.length,
      count,
      `Esperava ${count} partidas no ${group}, mas encontrei ${groupMatches.length}`
    );
  }
);

Then(
  'cada partida do grupo {string} deve ser entre dois times diferentes',
  function (this: ApiWorld, group: string) {
    assert.ok(this.tournament, 'Nenhum torneio recebido');
    const groupMatches = this.tournament.matches.filter(
      (m) => m.group === group
    );
    for (const match of groupMatches) {
      assert.ok(match.team1, 'Partida sem team1');
      assert.ok(match.team2, 'Partida sem team2');
      assert.notStrictEqual(
        match.team1,
        match.team2,
        `Partida com o mesmo time dos dois lados: ${match.team1}`
      );
    }
  }
);
