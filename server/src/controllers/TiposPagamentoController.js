import TiposPagamentoService from "../services/TiposPagamentoService.js";

class TiposPagamentoController {
  async criarTiposPagamento(req, res) {
    const tiposPagamento = await TiposPagamentoService.criarTiposPagamento(req);
    return res.status(tiposPagamento.status).json(tiposPagamento);
  }

  async buscarTipoPagamento(req, res) {
    const buscarTipoPagamento = await TiposPagamentoService.buscarTipoPagamento(
      req
    );
    return res.status(buscarTipoPagamento.status).json(buscarTipoPagamento);
  }

  async buscarTodosTiposPagamento(req, res) {
    const tiposPagamento =
      await TiposPagamentoService.buscarTodosTiposPagamento(req);
    return res.status(tiposPagamento.status).json(tiposPagamento);
  }

  async editarTiposPagamento(req, res) {
    const tiposPagamento = await TiposPagamentoService.editarTiposPagamento(
      req
    );
    return res.status(tiposPagamento.status).json(tiposPagamento);
  }

  async excluirTiposPagamento(req, res) {
    const tiposPagamento = await TiposPagamentoService.excluirTiposPagamento(
      req
    );
    return res.status(tiposPagamento.status).json(tiposPagamento);
  }
}
export default new TiposPagamentoController();
