import express, { json } from "express";
import * as db from "./src/config/db/initialData.js";

import cors from "cors";
import { router } from "./routes.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 5000;

db.createInitialData();

app.use(cors());
app.use(json());
app.use(router);

app.get("/api/status", (_, res) => {
  const status = {
    service: "API-GESTOR-BANCAS",
    status: "up",
    httpStatus: 200,
  };
  return res.status(200).json(status);
});

app.listen(PORT, () => {
  console.info(`server iniciou na porta ${PORT}`);
});
