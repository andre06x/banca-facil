import UsuarioService from "../services/UsuarioService.js";

class UsuarioController {
  async criarUsuario(req, res) {
    const usuario = await UsuarioService.criarUsuario(req);
    return res.status(usuario.status).json(usuario);
  }

  async autenticar(req, res) {
    console.log("aqui autenticar ");

    const usuario = await UsuarioService.autenticar(req);
    return res.status(usuario.status).json(usuario);
  }

  async buscarUsuario(req, res) {
    const usuario = await UsuarioService.buscarUsuario(req);
    return res.status(usuario.status).json(usuario);
  }

  async buscarFuncionarios(req, res) {
    const funcionario = await UsuarioService.buscarFuncionarios(req);
    return res.status(funcionario.status).json(funcionario);
  }

  async buscarTodosUsuarios(req, res) {
    const usuario = await UsuarioService.buscarTodosUsuarios(req);
    return res.status(usuario.status).json(usuario);
  }

  async editarUsuario(req, res) {
    const usuario = await UsuarioService.editarUsuario(req);
    return res.status(usuario.status).json(usuario);
  }

  async excluirUsuario(req, res) {
    const usuario = await UsuarioService.excluirUsuario(req);
    return res.status(usuario.status).json(usuario);
  }
}

export default new UsuarioController();
