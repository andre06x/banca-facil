import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Produtos from "../models/Produtos.js";

class ProdutosRepository {
  async criarProduto(dados_produto) {
    try {
      const produtos = await Produtos.create(dados_produto);
      return produtos.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarProduto(id) {
    try {
      const produto = await Produtos.findOne({ where: { id } });
      return produto.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodosProdutos(id) {
    try {
      const produtos = await Produtos.findAll({
        where: { estabelecimento_id: id },
      });
      return produtos;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarProduto(id, obj_produto) {
    try {
      const data = await Produtos.update(obj_produto, { where: { id } });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirProduto(id) {
    try {
      await Produtos.destroy({ where: { id } });
      return "Produto excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new ProdutosRepository();
