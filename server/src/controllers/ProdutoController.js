import ProdutoService from "../services/ProdutoService.js";

class ProdutoController {
  async criarProduto(req, res) {
    const produto = await ProdutoService.criarProduto(req);
    return res.status(produto.status).json(produto);
  }

  async buscarProduto(req, res) {
    const produto = await ProdutoService.buscarProduto(req);
    return res.status(produto.status).json(produto);
  }

  async buscarTodosProdutos(req, res) {
    const produto = await ProdutoService.buscarTodosProdutos(req);
    return res.status(produto.status).json(produto);
  }

  async editarProduto(req, res) {
    const produto = await ProdutoService.editarProduto(req);
    return res.status(produto.status).json(produto);
  }

  async excluirProduto(req, res) {
    const produto = await ProdutoService.excluirProduto(req);
    return res.status(produto.status).json(produto);
  }
}

export default new ProdutoController();
