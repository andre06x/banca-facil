import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import CategoriasRepository from "../repositories/CategoriasRepository.js";

class CategoriasService {
  async criarCategoria(req) {
    try {
      const dados_categoria = req.body;
      this.validarDadosCategoria(dados_categoria);

      const categoria = await CategoriasRepository.criarCategoria(dados_categoria);
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
      const categoria = await CategoriasRepository.buscarCategoria(id);

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
      const categorias = await CategoriasRepository.buscarTodasCategorias(usuarioid);
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

      const categoriaEditado = await CategoriasRepository.editarCategoria(
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
      const categoria = await CategoriasRepository.excluirCategoria(id);
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

export default new CategoriasService();
