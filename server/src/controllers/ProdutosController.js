import ProdutosService from "../services/ProdutosService.js";

class ProdutosController {
  async criarProduto(req, res) {
    const produto = await ProdutosService.criarProduto(req);
    return res.status(produto.status).json(produto);
  }

  async buscarProduto(req, res) {
    const produto = await ProdutosService.buscarProduto(req);
    return res.status(produto.status).json(produto);
  }

  async buscarTodosProdutos(req, res) {
    const produto = await ProdutosService.buscarTodosProdutos(req);
    return res.status(produto.status).json(produto);
  }

  async editarProduto(req, res) {
    const produto = await ProdutosService.editarProduto(req);
    return res.status(produto.status).json(produto);
  }

  async excluirProduto(req, res) {
    const produto = await ProdutosService.excluirProduto(req);
    return res.status(produto.status).json(produto);
  }
}

export default new ProdutosController();
