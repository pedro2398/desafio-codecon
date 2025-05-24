import express from "express";
import { pipeline } from "stream";
import { promisify } from "util";
import StreamArray from 'stream-json/streamers/StreamArray';
import { listSuperUsers, saveUser } from "./services";

const app = express();
const PORT = 3000;

app.post("/users", async (req, res) => {
  console.log("POST users");

  let count = 0;
  const jsonStream = StreamArray.withParser();
  const pipelineAsync = promisify(pipeline);

  jsonStream.on('data', async ({ value }) => {
    count++;
    await saveUser(value);
  });
  
  jsonStream.on('end', () => {
    console.log('Todos os objetos foram processados.');
  });
  
  try {
    await pipelineAsync(
      req,
      jsonStream,
    );

    res.status(200).json({
      message: "Arquivo recebido com sucesso",
      timestamp: new Date(),
      user_count: count,
    });
  } catch (err) {
    console.error("ERROR: ", err);

    res.status(500);
  }
});

app.get("/superusers", async (_req, res) => {
  console.log("GET superusers");
  
  const superUsers = await listSuperUsers();

  res.status(200).json({
    message: "Superusers listados com sucesso",
    timestamp: new Date(),
    superusers: superUsers,
  });
});

app.get("/top-countries", (_req, _res) => {
  //Agrupa os superusuários por país.
  //Retorna os 5 países com maior número de superusuários.
});

app.get("/team-insights", (_req, _res) => {
  //Agrupa por team.name.
  //Retorna: total de membros, líderes, projetos concluídos e % de membros ativos.
});

app.get("/active-users-per-day", (_req, _res) => {
  //Conta quantos logins aconteceram por data.
  //Query param opcional: ?min=3000 para filtrar dias com pelo menos 3.000 logins.
});

app.get("/evaluation", (_req, _res) => {
  //Ele deve executar uma autoavaliação dos principais endpoints da API e retornar um relatório de pontuação.

  //A avaliação deve testar:

  //Se o status retornado é 200
  //O tempo em milisegundos de resposta
  //Se o retorno é um JSON válido
  //Esse endpoint pode rodar scripts de teste embutidos no próprio projeto e retornar um JSON com os resultados. Ele será utilizado para validar a entrega de forma automática e rápida.
});

app.use((_req, res) => {
  res.status(404);
});

app.listen(PORT, () => {
  console.log("Running in port: 3000");
});
