import { Router } from "express";
import EstabelecimentoController from "../controllers/EstabelecimentoController.js";

const RotaEstabelecimento = new Router();

RotaEstabelecimento.post(
  "/api/estabelecimento",
  EstabelecimentoController.criarEstabelecimento
);
RotaEstabelecimento.get(
  "/api/todos-estabelecimentos/:usuarioid",
  EstabelecimentoController.buscarTodosEstabelecimentos
);

RotaEstabelecimento.get(
  "/api/estabelecimento/:id",
  EstabelecimentoController.buscarEstabelecimento
);
RotaEstabelecimento.put(
  "/api/estabelecimento/:id",
  EstabelecimentoController.editarEstabelecimento
);
RotaEstabelecimento.delete(
  "/api/estabelecimento/:id",
  EstabelecimentoController.excluirEstabelecimento
);

export { RotaEstabelecimento };
