import FuncionariosEstabelecimentoService from "../services/FuncionariosEstabelecimentoService.js";

class FuncionariosEstabelecimentoController {
  async criarFuncionariosEstabelecimento(req, res) {
    const Estabelecimento =
      await FuncionariosEstabelecimentoService.vincularFuncionarioEstabelecimento(req);
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }
  async buscarFuncionariosEstabelecimento(req, res) {
    const Estabelecimento =
      await FuncionariosEstabelecimentoService.buscarFuncionarioEstabelecimento(req);
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }

  async excluirFuncionariosEstabelecimento(req, res) {
    const Estabelecimento =
      await FuncionariosEstabelecimentoService.excluirVicnuloFuncionarioEstabelecimento(
        req
      );
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }
}

export default new FuncionariosEstabelecimentoController();
