import { Router } from "express";
import CheckToken from "./src/config/auth/CheckToken.js";
import UsuarioController from "./src/controllers/UsuarioController.js";
import { RotaUsuario } from "./src/routes/RotaUsuario.js";
import { RotaEstabelecimento } from "./src/routes/RotaEstabelecimento.js";
import { RotaFuncionarioEstabelecimento } from "./src/routes/RotaFuncionarioEstabelecimento.js";
import { RotaCategoria } from "./src/routes/RotaCategoria.js";
import { RotaProduto } from "./src/routes/RotaProduto.js";
import { RotaTipoPagamento } from "./src/routes/RotaTipoPagamento.js";
import { RotaTaxa } from "./src/routes/RotaTaxa.js";
import { RotaProdutoTaxa } from "./src/routes/RotaProdutoTaxa.js";
import { RotaVendaStatus } from "./src/routes/RotaVendaStatus.js";

const router = new Router();

router.post("/api/usuario", UsuarioController.criarUsuario);
router.post("/api/usuario/autenticar/", UsuarioController.autenticar);

router.use(RotaUsuario);
router.use(RotaCategoria);
router.use(RotaProduto);
router.use(RotaTipoPagamento);
router.use(RotaTaxa);
router.use(RotaProdutoTaxa);
router.use(RotaVendaStatus);
router.use(RotaFuncionarioEstabelecimento);
router.use(CheckToken);
router.use(RotaEstabelecimento);

//produtos

export { router };
