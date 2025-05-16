import express from "express";

import { SaveUsers } from "./services";

const app = express();

app.use(express.json({ limit: "5mb" }));

app.post("/users", (req, res) => {
  console.log("POST users");

  try {
    const count = SaveUsers(req.body);

    res.status(200).json({
      message: "Arquivo recebido com sucesso",
      user_count: count,
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

app.listen(3000, () => {
  console.log("Running in port: 3000");
});
