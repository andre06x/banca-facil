import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Categoria from "../models/Categoria.js";

class CategoriaRepository {
  async criarCategoria(dados_categoria) {
    try {
      const { categoria, usuario_id } = dados_categoria;
      const data = {
        usuario_id,
        categoria,
      };
      const categoriaData = await Categoria.create(data);
      return categoriaData.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async validarCategoriaExistente(dados_categoria) {
    try {
      const { usuario_id, categoria } = dados_categoria;
      const verificarCategoria = await Categoria.findOne({
        where: { usuario_id, categoria },
      });
      return verificarCategoria?.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async buscarCategoria(id) {
    try {
      const categoria = await Categoria.findOne({ where: { id } });
      return categoria.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodasCategorias(id) {
    try {
      const categorias = await Categoria.findAll({
        where: { usuario_id: id },
      });
      return categorias;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarCategoria(id, obj_categoria) {
    try {
      const data = await Categoria.update(obj_categoria, { where: { id } });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirCategoria(id) {
    try {
      await Categoria.destroy({ where: { id } });
      return "Estabelecimento excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new CategoriaRepository();
