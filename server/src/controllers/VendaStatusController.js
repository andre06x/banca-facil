import VendaStatusService from "../services/VendaStatusService.js";

class VendaStatusController {
  async criarVendaStatus(req, res) {
    const vendaStatus = await VendaStatusService.criarVendaStatus(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async buscarVendaStatus(req, res) {
    const vendaStatus = await VendaStatusService.buscarVendaStatus(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async buscarTodasVendasStatus(req, res) {
    const vendaStatus = await VendaStatusService.buscarTodasVendasStatus(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async editarVendaStatus(req, res) {
    const vendaStatus = await VendaStatusService.editarVendaStatus(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async excluirVendaStatus(req, res) {
    const vendaStatus = await VendaStatusService.excluirVendaStatus(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async gerarUltimasVendas(req, res) {
    const vendaStatus = await VendaStatusService.gerarUltimasVendas(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async tipoPagamento(req, res) {
    const vendaStatus = await VendaStatusService.tipoPagamento(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }
  async diasRentaveis(req, res) {
    const vendaStatus = await VendaStatusService.diasRentaveis(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async produtosTipoPagamento(req, res) {
    const vendaStatus = await VendaStatusService.produtosTipoPagamento(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async ultimosProdutosVendidos(req, res) {
    const vendaStatus = await VendaStatusService.ultimosProdutosVendidos(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async tiposPagamentoProduto(req, res) {
    const vendaStatus = await VendaStatusService.tiposPagamentoProduto(req);
    return res.status(vendaStatus.status).json(vendaStatus);
  }

  async gerarProdutosVendidosRentaveis(req, res) {
    const vendaStatus = await VendaStatusService.gerarProdutosVendidosRentaveis(
      req
    );
    return res.status(vendaStatus.status).json(vendaStatus);
  }
}

export default new VendaStatusController();
