import FuncionarioEstabelecimentoService from "../services/FuncionarioEstabelecimentoService.js";

class FuncionarioEstabelecimentoController {
  async criarFuncionariosEstabelecimento(req, res) {
    const Estabelecimento =
      await FuncionarioEstabelecimentoService.vincularFuncionarioEstabelecimento(
        req
      );
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }
  async buscarFuncionariosEstabelecimento(req, res) {
    const Estabelecimento =
      await FuncionarioEstabelecimentoService.buscarFuncionarioEstabelecimento(
        req
      );
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }

  async buscarEstabelecimentoFuncionario(req, res) {
    const Estabelecimento =
      await FuncionarioEstabelecimentoService.buscarEstabelecimentoFuncionario(
        req
      );
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }

  async excluirFuncionariosEstabelecimento(req, res) {
    const Estabelecimento =
      await FuncionarioEstabelecimentoService.excluirVicnuloFuncionarioEstabelecimento(
        req
      );
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }
}

export default new FuncionarioEstabelecimentoController();
