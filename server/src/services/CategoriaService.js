import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import CategoriaRepository from "../repositories/CategoriaRepository.js";

class CategoriaService {
  async criarCategoria(req) {
    try {
      const dados_categoria = req.body;
      this.validarDadosCategoria(dados_categoria);

      const categoria = await CategoriaRepository.criarCategoria(
        dados_categoria
      );
      return {
        status: httpStatus.SUCCESS,
        content: categoria,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarCategoria(req) {
    try {
      const { id } = req.params;
      const categoria = await CategoriaRepository.buscarCategoria(id);

      return {
        status: httpStatus.SUCCESS,
        content: categoria,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarTodasCategorias(req) {
    try {
      const { usuarioid } = req.params;
      const categorias = await CategoriaRepository.buscarTodasCategorias(
        usuarioid
      );
      return {
        status: httpStatus.SUCCESS,
        content: categorias,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async editarCategoria(req) {
    try {
      const { id } = req.params;
      const obj_categoria = req.body;
      this.validarId(id);

      const categoriaEditado = await CategoriaRepository.editarCategoria(
        id,
        obj_categoria
      );
      return {
        status: httpStatus.SUCCESS,
        contant: categoriaEditado,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirCategoria(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const categoria = await CategoriaRepository.excluirCategoria(id);
      return {
        status: httpStatus.SUCCESS,
        content: categoria,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  validarDadosCategoria(dados_categoria) {
    const { usuario_id, categoria } = dados_categoria;
    if (!usuario_id || !categoria) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "Usuário ou categoria não informado."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}

export default new CategoriaService();
