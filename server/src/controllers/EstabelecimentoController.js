import EstabelecimentoService from "../services/EstabelecimentoService.js";

class EstabelecimentoController {
  async criarEstabelecimento(req, res) {
    const Estabelecimento = await EstabelecimentoService.criarEstabelecimento(req);
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }

  async buscarEstabelecimento(req, res) {
    const Estabelecimento = await EstabelecimentoService.buscarEstabelecimento(req);
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }

  async buscarTodosEstabelecimento(req, res) {
    const Estabelecimento = await EstabelecimentoService.buscarTodosEstabelecimentos(req);
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }

  async editarEstabelecimento(req, res) {
    const Estabelecimento = await EstabelecimentoService.editarEstabelecimento(req);
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }

  async excluirEstabelecimento(req, res) {
    const Estabelecimento = await EstabelecimentoService.excluirEstabelecimento(req);
    return res.status(Estabelecimento.status).json(Estabelecimento);
  }
}

export default new EstabelecimentoController();
