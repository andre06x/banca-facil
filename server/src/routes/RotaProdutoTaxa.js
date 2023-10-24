import { Router } from "express";

import ProdutoTaxaController from "../controllers/ProdutoTaxaController.js";

const RotaProdutoTaxa = new Router();

RotaProdutoTaxa.post(
  "/api/produto-taxa",
  ProdutoTaxaController.criarProdutoTaxa
);
// RotaProdutoTaxa.get(
//   "/api/todos-produto-taxa/:estabelecimentoid",
//   ProdutoTaxa.buscarTodosProdutos
// );
RotaProdutoTaxa.get(
  "/api/produto-taxa/:id",
  ProdutoTaxaController.buscarProdutoTaxa
);
RotaProdutoTaxa.put(
  "/api/produto-taxa/:id",
  ProdutoTaxaController.editarProdutoTaxa
);
RotaProdutoTaxa.delete(
  "/api/produto-taxa/:id/produto/:produto",
  ProdutoTaxaController.excluirProdutoTaxa
);

export { RotaProdutoTaxa };
