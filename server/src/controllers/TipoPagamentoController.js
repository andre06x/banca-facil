import TipoPagamentoService from "../services/TipoPagamentoService.js";

class TipoPagamentoController {
  async criarTipoPagamento(req, res) {
    const tipoPagamento = await TipoPagamentoService.criarTipoPagamento(req);
    return res.status(tipoPagamento.status).json(tipoPagamento);
  }

  async buscarTipoPagamento(req, res) {
    const buscarTipoPagamento = await TipoPagamentoService.buscarTipoPagamento(
      req
    );
    return res.status(buscarTipoPagamento.status).json(buscarTipoPagamento);
  }

  async buscarTodosTiposPagamentos(req, res) {
    const tiposPagamento =
      await TipoPagamentoService.buscarTodosTiposPagamentos(req);
    return res.status(tiposPagamento.status).json(tiposPagamento);
  }

  async editarTipoPagamento(req, res) {
    const tiposPagamento = await TipoPagamentoService.editarTipoPagamento(req);
    return res.status(tiposPagamento.status).json(tiposPagamento);
  }

  async excluirTipoPagamento(req, res) {
    const tiposPagamento = await TipoPagamentoService.excluirTipoPagamento(req);
    return res.status(tiposPagamento.status).json(tiposPagamento);
  }
}
export default new TipoPagamentoController();
