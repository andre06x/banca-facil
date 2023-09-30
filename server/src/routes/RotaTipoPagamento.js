import { Router } from "express";
import TipoPagamentoController from "../controllers/TipoPagamentoController.js";

const RotaTipoPagamento = new Router();

RotaTipoPagamento.delete(
  "/api/tipos-pagamento/:id",
  TipoPagamentoController.excluirTipoPagamento
);

RotaTipoPagamento.put(
  "/api/tipos-pagamento/:id",
  TipoPagamentoController.editarTipoPagamento
);

RotaTipoPagamento.post(
  "/api/tipos-pagamento",
  TipoPagamentoController.criarTipoPagamento
);

RotaTipoPagamento.get(
  "/api/tipos-pagamento",
  TipoPagamentoController.buscarTodosTiposPagamentos
);

RotaTipoPagamento.get(
  "/api/tipos-pagamento/:id",
  TipoPagamentoController.buscarTipoPagamento
);

export { RotaTipoPagamento };
