import CategoriaService from "../services/CategoriaService.js";

class CategoriaController {
  async criarCategoria(req, res) {
    const categoria = await CategoriaService.criarCategoria(req);
    return res.status(categoria.status).json(categoria);
  }

  async buscarCategoria(req, res) {
    const categoria = await CategoriaService.buscarCategoria(req);
    return res.status(categoria.status).json(categoria);
  }

  async buscarTodasCategorias(req, res) {
    const categorias = await CategoriaService.buscarTodasCategorias(req);
    return res.status(categorias.status).json(categorias);
  }

  async editarCategoria(req, res) {
    const categoria = await CategoriaService.editarCategoria(req);
    return res.status(categoria.status).json(categoria);
  }

  async excluirCategoria(req, res) {
    const categoria = await CategoriaService.excluirCategoria(req);
    return res.status(categoria.status).json(categoria);
  }
}

export default new CategoriaController();
