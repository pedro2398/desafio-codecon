import express from "express";
import { pipeline, Transform, Writable } from "stream";
import { promisify } from "util";
import { clientDb } from "./config";

const app = express();
const PORT = 3000;

app.post("/users", async (req, res) => {
  console.log("POST users");

  const pipelineAsync = promisify(pipeline);

  try {
    const convertToString = new Transform({
      transform(chunk, _encoding, cb) {
        this.push(chunk.toString("utf8"));
        cb();
      },
    });

    const writableStream = new Writable({
      write: async function (chunk, _encoding, cb) {
        const client = await clientDb();
        await client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [chunk.name, chunk.email, chunk.password]);
        cb();
      },
    });

    await pipelineAsync(
      req,
      convertToString,
      writableStream
    );

    res.status(200).json({
      message: "Arquivo recebido com sucesso",
      timestamp: new Date(),
    });
  } catch (err) {
    console.error("ERROR: ", err);

    res.status(500);
  }
});

app.get("/superusers", (_req, _res) => {
  //Filtro: score >= 900 e active = true
  //Retorna os dados e o tempo de processamento da requisição.
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
