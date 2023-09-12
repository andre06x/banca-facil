import CategoriasService from "../services/CategoriasService.js";

class CategoriasController {
  async criarCategoria(req, res) {
    const categoria = await CategoriasService.criarCategoria(req);
    return res.status(categoria.status).json(categoria);
  }

  async buscarCategoria(req, res) {
    const categoria = await CategoriasService.buscarCategoria(req);
    return res.status(categoria.status).json(categoria);
  }

  async buscarTodasCategorias(req, res) {
    const categoria = await CategoriasService.buscarTodasCategorias(req);
    return res.status(categoria.status).json(categoria);
  }

  async editarCategoria(req, res) {
    const categoria = await CategoriasService.editarCategoria(req);
    return res.status(categoria.status).json(categoria);
  }

  async excluirCategoria(req, res) {
    const categoria = await CategoriasService.excluirCategoria(req);
    return res.status(categoria.status).json(categoria);
  }
}

export default new CategoriasController();
