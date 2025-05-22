# Desafio Técnico: Performance e Análise de Dados via API

## Objetivo

Baseado no desafio proposto pela codecon de criar uma API com o fito de processar dados de 100.000 usuarios, resolvi criar esse repositorio para desenvolver a minha solução e estudar o uso de Streams no Backend. 

- [Exemplos de respostas esperadas na API](https://github.com/codecon-dev/desafio-1-1s-vs-3j/blob/main/exemplos-endpoints.json)
- [Arquivo com 100 mil usuários para importar](https://drive.google.com/file/d/1zOweCB2jidgHwirp_8oBnFyDgJKkWdDA/view?usp=sharing)
- [Arquivo com 1 mil usuário para teste](https://drive.google.com/file/d/1BX03cWxkvB_MbZN8_vtTJBDGiCufyO92/view?usp=sharing)

---

## 🚀 Como rodar o projeto localmente

### 1. Instale as dependências

Após clonar o repositório, navegue até a raiz do projeto e instale as dependências com:

```bash
npm install
```

---

### 2. Crie o arquivo `.env`

Na raiz do projeto, crie um arquivo chamado `.env` com as seguintes variáveis de ambiente:

```env
DATABASE_URL=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

---

### 3. Gere o Prisma Client

Antes de executar a aplicação, você precisa gerar o cliente Prisma com:

```bash
npx prisma generate
```

> ℹ️ Este comando lê o schema do Prisma (`schema.prisma`) e gera o Prisma Client, uma biblioteca personalizada que permite consultar e manipular o banco de dados com segurança e facilidade.

---

### 4. Suba os containers com Docker

Com as variáveis de ambiente definidas e o Prisma Client gerado, inicie os containers com:

```bash
docker compose up --build
```

> 🐳 Isso irá levantar os serviços definidos no `docker-compose.yml`, incluindo a API e o banco de dados PostgreSQL.

---

### 5. Aplique o schema ao banco de dados

Com os containers rodando, abra um novo terminal e execute:

```bash
npx prisma db push
```

> 🔄 Este comando sincroniza o schema definido no arquivo `schema.prisma` com o banco de dados real, criando automaticamente as tabelas e estruturas necessárias.

---

### 6. Faça requisições para a API

Agora você pode interagir com a API acessando:

```
http://localhost:3000
```

Use ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints.

---

## JSON de entrada

O JSON contém uma lista de usuários com a seguinte estrutura:

```json
{
  "id": "uuid",
  "name": "string",
  "age": "int",
  "score": "int",
  "active": "bool",
  "country": "string",
  "team": {
    "name": "string",
    "leader": "bool",
    "projects": [{ "name": "string", "completed": "bool" }]
  },
  "logs": [{ "date": "YYYY-MM-DD", "action": "login/logout" }]
}
```

---

## Endpoints

### `POST /users`

Recebe e armazena os usuários na memória. Pode simular um banco de dados em memória.

### `GET /superusers`

- Filtro: `score >= 900` e `active = true`
- Retorna os dados e o tempo de processamento da requisição.

### `GET /top-countries`

- Agrupa os superusuários por país.
- Retorna os 5 países com maior número de superusuários.

### `GET /team-insights`

- Agrupa por `team.name`.
- Retorna: total de membros, líderes, projetos concluídos e % de membros ativos.

### `GET /active-users-per-day`

- Conta quantos logins aconteceram por data.
- Query param opcional: `?min=3000` para filtrar dias com pelo menos 3.000 logins.

### `GET /evaluation`

Ele deve executar uma autoavaliação dos principais endpoints da API e retornar um relatório de pontuação.

A avaliação deve testar:

- Se o status retornado é 200
- O tempo em milisegundos de resposta
- Se o retorno é um JSON válido

Esse endpoint pode rodar scripts de teste embutidos no próprio projeto e retornar um JSON com os resultados. Ele será utilizado para validar a entrega de forma automática e rápida.

---
