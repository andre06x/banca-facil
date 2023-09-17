import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import ProdutosRepository from "../repositories/ProdutoRepository.js";

class ProdutosService {
  async criarProduto(req) {
    try {
      const dados_produtos = req.body;
      this.validarDadosProduto(dados_produtos);

      const produto = await ProdutosRepository.criarProduto(dados_produtos);
      return {
        status: httpStatus.SUCCESS,
        content: produto,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarProduto(req) {
    try {
      const { id } = req.params;
      const produto = await ProdutosRepository.buscarProduto(id);

      return {
        status: httpStatus.SUCCESS,
        content: produto,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarTodosProdutos(req) {
    try {
      const { estabelecimentoid } = req.params;
      const produtos = await ProdutosRepository.buscarTodosProdutos(estabelecimentoid);
      return {
        status: httpStatus.SUCCESS,
        content: produtos,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async editarProduto(req) {
    try {
      const { id } = req.params;
      const obj_produto = req.body;
      this.validarId(id);

      const produtoEditado = await ProdutosRepository.editarProduto(id, obj_produto);
      return {
        status: httpStatus.SUCCESS,
        contant: produtoEditado,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirProduto(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const produto = await ProdutosRepository.excluirProduto(id);
      return {
        status: httpStatus.SUCCESS,
        content: produto,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  validarDadosProduto(dados_produtos) {
    const { nome, valor, quantidade_disponivel } = dados_produtos;
    if (!nome || !valor || !quantidade_disponivel) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "Nome, valor ou quantidade disponível não informado."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}

export default new ProdutosService();
