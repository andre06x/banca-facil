import { Router } from "express";

import ProdutoController from "../controllers/ProdutoController.js";

const RotaProduto = new Router();

RotaProduto.post("/api/produto", ProdutoController.criarProduto);
RotaProduto.get(
  "/api/todos-produtos/:estabelecimentoid",
  ProdutoController.buscarTodosProdutos
);
RotaProduto.get("/api/produto/:id", ProdutoController.buscarProduto);
RotaProduto.put("/api/produto/:id", ProdutoController.editarProduto);
RotaProduto.delete("/api/produto/:id", ProdutoController.excluirProduto);

export { RotaProduto };
