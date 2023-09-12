import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Categorias from "../models/Categorias.js";

class CategoriaRepository {
  async criarCategoria(dados_categoria) {
    try {
      const { categoria, usuario_id } = dados_categoria;
      const data = {
        usuario_id,
        categoria,
      };
      const categorias = await Categorias.create(data);
      return categorias.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarCategoria(id) {
    try {
      const categoria = await Categorias.findOne({ where: { id } });
      return categoria.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodasCategorias(id) {
    try {
      const categorias = await Categorias.findAll({
        where: { usuario_id: id },
      });
      return categorias;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarCategoria(id, obj_categoria) {
    try {
      const data = await Categorias.update(obj_categoria, { where: { id } });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirCategoria(id) {
    try {
      await Categorias.destroy({ where: { id } });
      return "Estabelecimento excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new CategoriaRepository();
