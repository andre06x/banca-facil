import express, { json } from "express";
import cors from "cors";

const app = express();
const env = process.env;
const PORT = env.PORT || 5000;

app.use(cors());
app.use(json());

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
