import ProdutoTaxaService from "../services/ProdutoTaxaService.js";

class ProdutoTaxaController {
  async criarProdutoTaxa(req, res) {
    const produtoTaxa = await ProdutoTaxaService.criarProdutoTaxa(req);
    return res.status(produtoTaxa.status).json(produtoTaxa);
  }

  async buscarProdutoTaxa(req, res) {
    const produtoTaxa = await ProdutoTaxaService.buscarProdutoTaxa(req);
    return res.status(produtoTaxa.status).json(produtoTaxa);
  }

  async buscarTodosProdutos(req, res) {
    const produtoTaxa = await ProdutoTaxaService.buscarTodosProdutos(req);
    return res.status(produtoTaxa.status).json(produtoTaxa);
  }

  async editarProdutoTaxa(req, res) {
    const produtoTaxa = await ProdutoTaxaService.editarProdutoTaxa(req);
    return res.status(produtoTaxa.status).json(produtoTaxa);
  }

  async excluirProdutoTaxa(req, res) {
    const produtoTaxa = await ProdutoTaxaService.excluirProdutoTaxa(req);
    return res.status(produtoTaxa.status).json(produtoTaxa);
  }
}

export default new ProdutoTaxaController();
