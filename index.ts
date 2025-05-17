import express from "express";
import { appendFileSync } from "fs";
import { pipeline, Transform, Writable } from "stream";
import { promisify } from "util";

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
      write: function (chunk, _encoding, cb) {
        appendFileSync("./users.json", chunk);
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

app.get("/superusers");

app.get("/top-countries");

app.get("/team-insights");

app.get("/active-users-per-day");

app.get("/evaluation");

app.use((_req, res) => {
  res.status(404);
});

app.listen(PORT, () => {
  console.log("Running in port: 3000");
});
