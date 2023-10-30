import { Router } from "express";

import VendaStatusController from "../controllers/VendaStatusController.js";

const RotaVendaStatus = new Router();

RotaVendaStatus.post(
  "/api/venda-status",
  VendaStatusController.criarVendaStatus
);
RotaVendaStatus.get(
  "/api/todas-venda-status/:estabelecimentoid",
  VendaStatusController.buscarTodasVendasStatus
);
RotaVendaStatus.get(
  "/api/venda-status/:id",
  VendaStatusController.buscarVendaStatus
);
RotaVendaStatus.put(
  "/api/venda-status/:id",
  VendaStatusController.editarVendaStatus
);
RotaVendaStatus.delete(
  "/api/venda-status/:id",
  VendaStatusController.excluirVendaStatus
);

//CRIAR OUTRA ROTA

//relatorio de vendas
RotaVendaStatus.post(
  "/api/relatorio/gerar-ultimas-vendas/",
  VendaStatusController.gerarUltimasVendas
);

//relatorio de dias
RotaVendaStatus.post(
  "/api/relatorio/dias-rentaveis/",
  VendaStatusController.diasRentaveis
);

//relatorios por produtos
RotaVendaStatus.post(
  "/api/relatorio/produtos-tipo-pagamento/",
  VendaStatusController.produtosTipoPagamento
);

RotaVendaStatus.post(
  "/api/relatorio/ultimos-produtos-vendidos/",
  VendaStatusController.ultimosProdutosVendidos
);

RotaVendaStatus.post(
  "/api/relatorio/produtos-vendidos-rentaveis/",
  VendaStatusController.gerarProdutosVendidosRentaveis
);

// relatorio por tipos de pagamento
RotaVendaStatus.post(
  "/api/relatorio/tipo-pagamento/",
  VendaStatusController.tipoPagamento
);

RotaVendaStatus.post(
  "/api/relatorio/tipos-pagamentos-produto/",
  VendaStatusController.tiposPagamentoProduto
);
export { RotaVendaStatus };
