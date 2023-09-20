import { Router } from "express";
import CategoriaController from "../controllers/CategoriaController.js";

const RotaCategoria = new Router();

RotaCategoria.post("/api/categoria", CategoriaController.criarCategoria);
RotaCategoria.get(
  "/api/todas-categorias/:usuarioid",
  CategoriaController.buscarTodasCategorias
);
RotaCategoria.get("/api/categoria/:id", CategoriaController.buscarCategoria);
RotaCategoria.put("/api/categoria/:id", CategoriaController.editarCategoria);
RotaCategoria.delete(
  "/api/categoria/:id",
  CategoriaController.excluirCategoria
);

export { RotaCategoria };
