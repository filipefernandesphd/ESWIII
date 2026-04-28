## Principais códigos de status HTTP

### Sucesso (2xx)

- **200 OK**  
  Requisição bem-sucedida (GET, PUT, etc.)

- **201 Created**  
  Recurso criado com sucesso (POST)

- **204 No Content**  
  Sucesso, mas sem conteúdo na resposta

### Redirecionamento (3xx)

- **301 Moved Permanently**  
  Recurso movido permanentemente

- **302 Found**  
  Redirecionamento temporário

### Erro do cliente (4xx)

- **400 Bad Request**  
  Requisição inválida (erro de dados)

- **401 Unauthorized**  
  Usuário não autenticado

- **403 Forbidden**  
  Usuário autenticado, mas sem permissão

- **404 Not Found**  
  Recurso não encontrado

- **409 Conflict**  
  Conflito (ex: cadastro duplicado)

- **422 Unprocessable Entity**  
  Dados válidos, mas regra de negócio inválida

### Erro do servidor (5xx)

- **500 Internal Server Error**  
  Erro genérico no servidor

- **502 Bad Gateway**  
  Erro de comunicação entre servidores

- **503 Service Unavailable**  
  Serviço indisponível (sobrecarga/manutenção)

### Resumo rápido

| Código | Significado |
|--------|------------|
| 200    | OK |
| 201    | Criado |
| 204    | Sem conteúdo |
| 400    | Requisição inválida |
| 401    | Não autenticado |
| 403    | Proibido |
| 404    | Não encontrado |
| 409    | Conflito |
| 422    | Regra inválida |
| 500    | Erro interno |

### Dica

- **2xx** → sucesso  
- **4xx** → erro do cliente  
- **5xx** → erro do servidor  