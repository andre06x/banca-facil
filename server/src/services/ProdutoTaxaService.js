import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import ProdutoTaxaRepository from "../repositories/ProdutoTaxaRepository.js";

class ProdutoTaxaService {
  async criarProdutoTaxa(req) {
    try {
      const dados_produto_taxa = req.body;
      this.validarDadosProduto(dados_produto_taxa);

      const produto_taxa = await ProdutoTaxaRepository.criarProdutoTaxa(
        dados_produto_taxa
      );
      return {
        status: httpStatus.SUCCESS,
        content: produto_taxa,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarProdutoTaxa(req) {
    try {
      const { id } = req.params;
      const produto = await ProdutoTaxaRepository.buscarProdutoTaxa(id);

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
      const produtos = await ProdutoTaxaRepository.buscarTodosProdutos(
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

  async editarProdutoTaxa(req) {
    try {
      const { id } = req.params;
      const obj_produto = req.body;
      this.validarId(id);

      const produtoEditado = await ProdutoTaxaRepository.editarProdutoTaxa(
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

  async excluirProdutoTaxa(req) {
    try {
      const { id, produto: produto_id } = req.params;
      this.validarId(id);
      const produto = await ProdutoTaxaRepository.excluirProdutoTaxa(
        id,
        produto_id
      );
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
    const { taxa_id, produto_id } = dados_produtos;
    if (!taxa_id || !produto_id) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "TaxaId ou ProdutoId faltando."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}

export default new ProdutoTaxaService();
