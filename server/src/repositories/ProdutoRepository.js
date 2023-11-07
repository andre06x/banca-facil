import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Produto from "../models/Produto.js";
import Taxa from "../models/Taxa.js";
import TipoPagamento from "../models/TipoPagamento.js";
import ProdutoTaxa from "../models/ProdutoTaxa.js";
import Estabelecimento from "../models/Estabelecimento.js";
import Categoria from "../models/Categoria.js";

class ProdutoRepository {
  async criarProduto(dados_produto) {
    try {
      const produtos = await Produto.create(dados_produto);
      return this.buscarProduto(produtos.dataValues.id);
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async validarProdutoExistente(dados_produto) {
    try {
      const { estabelecimento_id, nome } = dados_produto;
      const produto = await Produto.findOne({
        where: { estabelecimento_id, nome },
      });
      return produto?.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarProduto(id) {
    try {
      const produto = await Produto.findOne({
        where: { id },
        include: [
          {
            model: ProdutoTaxa,
            include: [{ model: Taxa, include: [{ model: TipoPagamento }] }],
          },
          { model: Categoria },
        ],
      });
      return produto.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodosProdutos(id) {
    try {
      const produtos = await Produto.findAll({
        include: [
          {
            model: ProdutoTaxa,
            include: [{ model: Taxa, include: [{ model: TipoPagamento }] }],
          },
          { model: Categoria },
        ],
        where: { estabelecimento_id: id },
      });

      // const produtos = await ProdutoTaxa.findAll({
      //   include: [
      //     {
      //       model: Produto,
      //       include: {
      //         model: Estabelecimento,
      //         where: { id: id },
      //       },
      //     },
      //     {
      //       model: Taxa,
      //       include: {
      //         model: TipoPagamento,
      //       },
      //     },
      //   ],
      // });
      return produtos;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarProduto(id, obj_produto) {
    try {
      const data = await Produto.update(obj_produto, { where: { id } });
      return this.buscarProduto(id);
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
