import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js";

class ProdutosService {
  async criarProduto(req) {
    try {
      const dados_produtos = req.body;
      this.validarDadosProduto(dados_produtos);
      await this.validarProdutoExistente(dados_produtos);

      const produto = await ProdutoRepository.criarProduto(dados_produtos);
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
      const produto = await ProdutoRepository.buscarProduto(id);

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
      const produtos = await ProdutoRepository.buscarTodosProdutos(
        estabelecimentoid
      );
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

      const produtoEditado = await ProdutoRepository.editarProduto(
        id,
        obj_produto
      );
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
      const produto = await ProdutoRepository.excluirProduto(id);
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

  async validarProdutoExistente(dados_produtos) {
    const produtoExistente = await ProdutoRepository.validarProdutoExistente(
      dados_produtos
    );
    if (produtoExistente) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "O produto informado já existe em nossa base de dados. Por favor, informe um novo produto."
      );
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
