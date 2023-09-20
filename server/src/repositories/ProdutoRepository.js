import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Produto from "../models/Produto.js";

class ProdutoRepository {
  async criarProduto(dados_produto) {
    try {
      const produtos = await Produto.create(dados_produto);
      return produtos.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarProduto(id) {
    try {
      const produto = await Produto.findOne({ where: { id } });
      return produto.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodosProdutos(id) {
    try {
      const produtos = await Produto.findAll({
        where: { estabelecimento_id: id },
      });
      return produtos;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarProduto(id, obj_produto) {
    try {
      const data = await Produto.update(obj_produto, { where: { id } });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirProduto(id) {
    try {
      await Produto.destroy({ where: { id } });
      return "Produto excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new ProdutoRepository();
