import express from "express";

import { SaveUsers } from "./services";

const app = express();

app.use(express.json({ limit: "5mb" }));

app.post("/users");

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
