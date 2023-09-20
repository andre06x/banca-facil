import { Router } from "express";
import TaxaController from "../controllers/TaxaController.js";

const RotaTaxa = new Router();

RotaTaxa.post("/api/taxa", TaxaController.criarTaxa);

/* Buscar todas as taxas a partir de um usuario  */
RotaTaxa.get("/api/taxa/:usuarioid", TaxaController.buscarTodasTaxas);
RotaTaxa.delete("/api/taxa/:id", TaxaController.excluirTaxa);

RotaTaxa.get("/api/taxa/:id", TaxaController.buscarTaxa);
RotaTaxa.put("/api/taxa/:id", TaxaController.editarTaxa);

export { RotaTaxa };
