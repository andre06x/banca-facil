import { Router } from "express";
import FuncionarioEstabelecimento from "../controllers/FuncionarioEstabelecimento.js";

const RotaFuncionarioEstabelecimento = new Router();

RotaFuncionarioEstabelecimento.post(
  "/api/vincular-funcionario-estabelecimento",
  FuncionarioEstabelecimento.criarFuncionariosEstabelecimento
);
RotaFuncionarioEstabelecimento.get(
  "/api/buscar-funcionario-estabelecimento/:id",
  FuncionarioEstabelecimento.buscarFuncionariosEstabelecimento
);
RotaFuncionarioEstabelecimento.get(
  "/api/buscar-estabelecimento-funcionario/:id",
  FuncionarioEstabelecimento.buscarEstabelecimentoFuncionario
);
RotaFuncionarioEstabelecimento.delete(
  "/api/excluir-vinculo-funcionario-estabelecimento/:id",
  FuncionarioEstabelecimento.excluirFuncionariosEstabelecimento
);

export { RotaFuncionarioEstabelecimento };
