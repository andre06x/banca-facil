import { Router } from "express";
import CheckToken from "./src/config/auth/CheckToken.js";
import CheckAdmin from "./src/config/auth/CheckToken.js";
import EstabelecimentoController from "./src/controllers/EstabelecimentoController.js";
import UsuarioController from "./src/controllers/UsuarioController.js";
import FuncionariosEstabelecimentoController from "./src/controllers/FuncionariosEstabelecimentoController.js";
const router = new Router();

router.post("/api/usuario", UsuarioController.criarUsuario);
router.get("/api/usuario/autenticar", UsuarioController.autenticar);

router.use(CheckToken);

router.get("/api/usuario", UsuarioController.buscarTodosUsuario);
router.get("/api/usuario/:id", UsuarioController.buscarUsuario);
router.put("/api/usuario/:id", UsuarioController.editarUsuario);
router.delete("/api/usuario/:id", UsuarioController.excluirUsuario);
router.get("/api/buscar-funcionarios/:usuario", UsuarioController.buscarFuncionarios);

router.post("/api/estabelecimento", EstabelecimentoController.criarEstabelecimento);
router.get(
  "/api/todos-estabelecimentos/:usuarioid",
  EstabelecimentoController.buscarTodosEstabelecimento
);

router.get("/api/estabelecimento/:id", EstabelecimentoController.buscarEstabelecimento);
router.put("/api/estabelecimento/:id", EstabelecimentoController.editarEstabelecimento);
router.delete(
  "/api/estabelecimento/:id",
  EstabelecimentoController.excluirEstabelecimento
);

router.post(
  "/api/vincular-funcionario-estabelecimento",
  FuncionariosEstabelecimentoController.criarFuncionariosEstabelecimento
);
router.get(
  "/api/buscar-funcionario-estabelecimento/:id",
  FuncionariosEstabelecimentoController.buscarFuncionariosEstabelecimento
);
router.get(
  "/api/buscar-estabelecimento-funcionario/:id",
  FuncionariosEstabelecimentoController.buscarEstabelecimentoFuncionario
);
router.delete(
  "/api/excluir-vinculo-funcionario-estabelecimento/:id",
  FuncionariosEstabelecimentoController.excluirFuncionariosEstabelecimento
);
export { router };
