import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import VendaStatus from "../models/VendaStatus.js";
import moment from "moment";
import VendaProduto from "../models/VendaProdutos.js";
import Produto from "../models/Produto.js";
import ProdutoTaxa from "../models/ProdutoTaxa.js";
import Taxa from "../models/Taxa.js";
import TipoPagamento from "../models/TipoPagamento.js";
import sequelize from "../config/db/dbConfig.js";
import Usuario from "../models/Usuario.js";
import Estabelecimento from "../models/Estabelecimento.js";
import { Op, Sequelize } from "sequelize";

class VendaStatusRepository {
  async suaFuncaoAssincrona(id, quantidade, dados_produto_status) {
    const { valor, produto_taxas, quantidade_disponivel, nome } =
      await Produto.findOne({
        where: { id },
        include: {
          model: ProdutoTaxa,
          include: {
            model: Taxa,
            where: {
              tipo_pagamento_id: dados_produto_status.tipo_pagamento_id,
            },
          },
        },
      });

    const valor_unitario = Number(valor);
    const valor_quantidade = Number(valor) * Number(quantidade);

    const valor_quantidade_taxa =
      produto_taxas.length > 0
        ? produto_taxas[0].taxa.acumulativa
          ? Number(produto_taxas[0].taxa.taxa) * Number(quantidade)
          : Number(produto_taxas[0].taxa.taxa)
        : 0;

    const valor_total = valor_quantidade + valor_quantidade_taxa;
    await Produto.update(
      {
        quantidade_disponivel: Sequelize.literal(
          `quantidade_disponivel - ${quantidade}`
        ),
      },
      {
        where: { id },
        returning: true,
      }
    );
    return {
      valor_unitario,
      valor_quantidade,
      valor_quantidade_taxa,
      valor_total,
    };
  }

  async validarQuantidadeDisponivelProdutos(produtos) {
    const ids_produtos = produtos.map((produto) => produto.produto_id);

    const produtos_existentes = await Produto.findAll({
      where: { id: ids_produtos },
    });

    const avisos = [];
    produtos_existentes.map(async (produto) => {
      const { quantidade_disponivel, id, nome } = produto;
      const { quantidade } = produtos.find(
        (produto) => produto.produto_id === id
      );

      const quantidadeDisponivelCompra =
        Number(quantidade_disponivel) >= Number(quantidade);

      const aviso = `Quantidade indisponivel para ${nome}, quantidade em estoque: ${quantidade_disponivel} solicitada: ${quantidade}`;
      const objAviso = {
        produto_id: id,
        aviso,
        nome,
        quantidadeEstoque: quantidade_disponivel,
        quantidadeSolicitada: quantidade,
      };
      if (!quantidadeDisponivelCompra) {
        avisos.push(objAviso);
      }
    });

    return avisos;
  }

  async criarVendaStatus(dados_produto_status) {
    try {
      const avisosVerificacao = await this.validarQuantidadeDisponivelProdutos(
        dados_produto_status.produtos
      );

      console.log(avisosVerificacao);
      if (avisosVerificacao.length > 0) {
        throw new APIException(httpStatus.BAD_REQUEST, avisosVerificacao);
      }

      const mom = moment();
      const data = {
        ...dados_produto_status,
        data_completa: mom.format("YYYY-MM-DDTHH:mm:ss"),
        data: mom.format("YYYY-MM-DD"),
        dia: mom.format("DD"),
        mes: mom.format("MM"),
        ano: mom.format("YYYY"),
        dia_semana: mom.day(),
        horario_completo: mom.format("HH:mm:ss"),
        horario: mom.format("HH"),
      };

      const venda_status = await VendaStatus.create(data);
      const venda_status_id = venda_status.dataValues.id;

      const produtos = await Promise.all(
        dados_produto_status.produtos.map(async (produto) => {
          const {
            valor_unitario,
            valor_quantidade,
            valor_quantidade_taxa,
            valor_total,
          } = await this.suaFuncaoAssincrona(
            produto.produto_id,
            produto.quantidade,
            dados_produto_status
          );

          return {
            ...produto,
            venda_status_id,
            valor_unitario,
            valor_quantidade,
            valor_quantidade_taxa,
            valor_total,
          };
        })
      );

      const valor_total = produtos.reduce(
        (acumulador, produto) =>
          Number(acumulador) + Number(produto.valor_total),
        0
      );

      VendaStatus.update(
        { valor_total },
        {
          where: { id: venda_status_id },
        }
      );

      const produtosvenda = await VendaProduto.bulkCreate(produtos);
      return {
        produtos,
      };
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarVendaStatus(id) {
    try {
      const venda_status = await VendaStatus.findOne({
        where: { id },
        include: { model: VendaProduto, include: { model: Produto } },
      });
      return venda_status.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarVendaStatus(id, obj_produto_taxa) {
    try {
      const data = await VendaStatus.update(obj_produto_taxa, {
        where: { id },
      });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirVendaStatus(id) {
    try {
      await VendaStatus.destroy({ where: { id } });
      return "Produto excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  // essas duas duplicadas
  async buscarTodasVendasStatus(id) {
    try {
      const venda_status = await VendaStatus.findAll({
        include: { model: VendaProduto, include: { model: Produto } },
        where: { estabelecimento_id: id },
      });

      return venda_status;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async gerarUltimasVendas(dados) {
    try {
      const { estabelecimento_id, data, dataInicio, dataFim } = dados;
      const where = { estabelecimento_id };

      if (dataInicio && dataFim) {
        where.data = {
          [Op.between]: [dataInicio, dataFim],
        };
      } else if (data) {
        where.data = data;
      }

      const vendas = await VendaStatus.findAll({
        include: [
          {
            model: VendaProduto,
            include: Produto,
          },
          {
            model: Usuario,
            attributes: ["nome", "responsavel"],
          },
          {
            model: TipoPagamento,
            attributes: ["tipo"],
          },
          {
            model: Estabelecimento,
            attributes: ["nome_estabelecimento"],
          },
        ],
        where,
        order: [["data_completa", "DESC"]],
      });
      return vendas;
    } catch (err) {
      console.log(err);
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async tipoPagamento(dados) {
    try {
      //campo estabelecimento id obrigatório
      const { estabelecimento_id, tipo_pagamento_id, dataInicio, dataFim } =
        dados;

      const where = { estabelecimento_id };
      if (dataInicio && dataFim) {
        where.data = {
          [Op.between]: [dataInicio, dataFim],
        };
      }

      let vendas = await VendaStatus.findAll({
        attributes: [
          [sequelize.fn("SUM", sequelize.col("valor_total")), "valor_total"],
          [
            sequelize.fn("COUNT", sequelize.col("tipo_pagamento_id")),
            "quantidade_vendas",
          ],
          "tipo_pagamento.tipo",
          "tipo_pagamento_id",
        ],
        include: [
          {
            model: TipoPagamento,
            attributes: [],
          },
        ],
        where: where,
        group: ["tipo_pagamento.id", "tipo_pagamento_id"],
        raw: true,
      });

      if (vendas.length > 0) {
        for (const tipo_pagamento of vendas) {
          let dados_tipo = {
            ...dados,
            tipo_pagamento_id: tipo_pagamento.tipo_pagamento_id,
          };
          let produtos = await this.produtosTipoPagamento(dados_tipo);
          tipo_pagamento.produtos = produtos;
        }

        console.log(vendas);
        return vendas;
      } else {
        return vendas;
      }
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async diasRentaveis(dados) {
    try {
      //campo estabelecimento id obrigatório

      const { estabelecimento_id, data, dataInicio, dataFim } = dados;
      const where = { estabelecimento_id };

      if (dataInicio && dataFim) {
        where.data = {
          [Op.between]: [dataInicio, dataFim],
        };
      } else if (data) {
        where.data = data;
      }

      const vendas = await VendaStatus.findAll({
        attributes: [
          [sequelize.fn("SUM", sequelize.col("valor_total")), "total"],
          "data",
        ],
        where,
        group: ["data"],
      });
      return vendas;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async produtosTipoPagamento(dados) {
    try {
      const {
        estabelecimento_id,
        tipo_pagamento_id,
        dataInicio,
        dataFim,
        data,
      } = dados;

      const vendas = await sequelize.query(
        `
        SELECT tipo_pagamento.tipo, nome, SUM(venda_produto.valor_total) as total, SUM(venda_produto.quantidade) as quantidade 
        FROM "venda_status"
        JOIN tipo_pagamento ON tipo_pagamento."id" = venda_status.tipo_pagamento_id
        JOIN venda_produto ON venda_produto.venda_status_id = venda_status.id
        JOIN produto ON produto.id = venda_produto.produto_id
        WHERE tipo_pagamento.id = '${tipo_pagamento_id}'
        ${dataInicio ? `AND venda_status.data >= '${dataInicio}'` : ""}
        ${dataFim ? `AND venda_status.data <= '${dataFim}'` : ""}
        ${
          data && !dataInicio && !dataFim
            ? `AND venda_status.data = '${data}'`
            : ""
        }
        AND venda_status.estabelecimento_id = '${estabelecimento_id}'
        GROUP BY tipo_pagamento."id", nome;
        `,
        { raw: true, fieldMap: true }
      );
      return vendas[0];
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  // ultimos produtos vendidos

  async ultimosProdutosVendidos(dados) {
    try {
      //campo estabelecimento id obrigatório

      const { estabelecimento_id, dataInicio, dataFim, tipo_pagamento_id } =
        dados;

      const vendas = await sequelize.query(
        `
        SELECT venda_status.data, usuario.nome as usuario_nome, tipo_pagamento.tipo, venda_produto.venda_status_id, produto.nome as produto_nome, SUM(venda_status.valor_total) as total, SUM(venda_produto.quantidade) as quantidade FROM "venda_status"
        JOIN tipo_pagamento ON tipo_pagamento."id" = venda_status.tipo_pagamento_id
        JOIN venda_produto ON venda_produto.venda_status_id = venda_status.id
        JOIN produto ON produto.id = venda_produto.produto_id
        JOIN usuario ON usuario.id = venda_status.usuario_id
        WHERE venda_status.estabelecimento_id = '${estabelecimento_id}' AND
        data BETWEEN '${dataInicio}' AND '${dataFim}' 
        GROUP BY venda_produto.venda_status_id, produto.nome, venda_status.data_completa, data, tipo_pagamento.tipo, usuario.nome
        ORDER BY venda_status.data_completa DESC;
      `,
        { raw: true }
      );
      return vendas[0];
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async gerarProdutosVendidosRentaveis(dados) {
    try {
      let { estabelecimento_id, data, dataInicio, dataFim, ordenado } = dados;
      ordenado = ordenado ? ordenado : "quantidade";

      const vendas = await sequelize.query(
        `
        SELECT produto.nome, 
               SUM(venda_produto.valor_total) as total, 
               SUM(venda_produto.quantidade) as quantidade 
        FROM "venda_status"
        JOIN venda_produto ON venda_produto.venda_status_id = venda_status.id
        JOIN produto ON produto.id = venda_produto.produto_id
        WHERE venda_status.estabelecimento_id = '${estabelecimento_id}'
        ${dataInicio ? `AND venda_status.data >= '${dataInicio}'` : ""}
        ${dataFim ? `AND venda_status.data <= '${dataFim}'` : ""}
        ${
          data && !dataInicio && !dataFim
            ? `AND venda_status.data = '${data}'`
            : ""
        }
        GROUP BY nome
        ORDER BY ${ordenado} DESC; 
        `,
        { raw: true, fieldMap: true }
      );

      return vendas[0];
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async tiposPagamentoProduto(dados) {
    try {
      const { estabelecimento_id, data, produto_id, dataInicio, dataFim } =
        dados;

      const vendas = await sequelize.query(
        `
        SELECT tipo_pagamento.tipo, produto.nome, SUM(venda_produto.valor_total) as total, SUM(venda_produto.quantidade) as quantidade FROM "venda_status"
        JOIN tipo_pagamento ON tipo_pagamento."id" = venda_status.tipo_pagamento_id
        JOIN venda_produto ON venda_produto.venda_status_id = venda_status.id
        JOIN produto ON produto.id = venda_produto.produto_id
        WHERE venda_status.estabelecimento_id = '${estabelecimento_id}' AND
        data BETWEEN '${dataInicio}' AND '${dataFim}' AND
        produto.id = '${produto_id}' 
        GROUP BY tipo_pagamento."id", nome;
      `,
        { raw: true, fieldMap: true }
      );
      return vendas[0];
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new VendaStatusRepository();
