import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Produto from "../models/Produto.js";
import Taxa from "../models/Taxa.js";
import ProdutoTaxa from "../models/ProdutoTaxa.js";

class ProdutoTaxaRepository {
  async criarProdutoTaxa(dados_produto_taxa) {
    try {
      const produto_taxa = await ProdutoTaxa.create(dados_produto_taxa);
      return produto_taxa.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarProdutoTaxa(id) {
    try {
      const produto_taxas = await ProdutoTaxa.findOne({ where: { id } });
      return produto_taxas.dataValues;
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

  async editarProdutoTaxa(id, obj_produto_taxa) {
    try {
      const data = await ProdutoTaxa.update(obj_produto_taxa, {
        where: { id },
      });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirProdutoTaxa(id) {
    try {
      await ProdutoTaxa.destroy({ where: { id } });
      return "Produto excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new ProdutoTaxaRepository();
