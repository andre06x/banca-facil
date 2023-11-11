import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const RotaUsuario = new Router();

//RotaUsuario.get("/api/usuario", UsuarioController.buscarTodosUsuarios);
RotaUsuario.get("/api/usuario/:id", UsuarioController.buscarUsuario);
RotaUsuario.put("/api/usuario/:id", UsuarioController.editarUsuario);
RotaUsuario.delete("/api/usuario/:id", UsuarioController.excluirUsuario);
RotaUsuario.get(
  "/api/buscar-funcionarios/:usuario",
  UsuarioController.buscarFuncionarios
);

export { RotaUsuario };
