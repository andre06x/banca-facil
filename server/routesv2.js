import { Router } from "express";
import CheckToken from "./src/config/auth/CheckToken.js";
import CheckAdmin from "./src/config/auth/CheckToken.js";
import EstabelecimentoController from "./src/controllers/EstabelecimentoController.js";
import UsuarioController from "./src/controllers/UsuarioController.js";
import FuncionariosEstabelecimentoController from "./src/controllers/FuncionariosEstabelecimentoController.js";
import TiposPagamentoController from "./src/controllers/TiposPagamentoController.js";
import TaxaController from "./src/controllers/TaxaController.js";

const routerv2 = new Router();

//tipo pagamento
routerv2.delete(
  "/api/tipos-pagamento/:id",
  TiposPagamentoController.excluirTiposPagamento
);

routerv2.put(
  "/api/tipos-pagamento/:id",
  TiposPagamentoController.editarTiposPagamento
);

routerv2.post(
  "/api/tipos-pagamento",
  TiposPagamentoController.criarTiposPagamento
);

routerv2.get(
  "/api/tipos-pagamento",
  TiposPagamentoController.buscarTodosTiposPagamento
);

routerv2.get(
  "/api/tipos-pagamento/:id",
  TiposPagamentoController.buscarTipoPagamento
);

// taxa

routerv2.post("/api/taxas", TaxaController.criarTaxa);
routerv2.get("/api/taxas", TaxaController.buscarTodasTaxas);
routerv2.delete("/api/taxas/:id", TaxaController.excluirTaxa);

routerv2.get("/api/taxas/:id", TaxaController.buscarTaxa);
routerv2.put("/api/taxas/:id", TaxaController.editarTaxa);

export { routerv2 };
