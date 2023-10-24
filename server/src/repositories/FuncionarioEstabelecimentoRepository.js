import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import FuncionarioEstabelecimento from "../models/FuncionarioEstabelecimento.js";
import { Op } from "sequelize";
import Usuario from "../models/Usuario.js";
import Estabelecimento from "../models/Estabelecimento.js";
import VendaStatus from "../models/VendaStatus.js";

class FuncionarioEstabelecimentoRepository {
  async criarVinculo(dados) {
    try {
      const { usuario_id, estabelecimento_id } = dados;
      const data = {
        usuario_id,
        estabelecimento_id,
      };
      const estabelecimento = await FuncionarioEstabelecimento.create(data);
      return this.buscarEstabelecimentoFuncionario(
        estabelecimento.dataValues.usuario_id
      );
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async buscarEstabelecimentoFuncionario(id) {
    try {
      const estabelecimentos = await FuncionarioEstabelecimento.findAll({
        attributes: [
          "funcionario_estabelecimento.id as id_vinculo",
          "estabelecimento.id",
          "estabelecimento.cidade",
          "estabelecimento.lat",
          "estabelecimento.lon",
          "estabelecimento.nome_estabelecimento",
        ],
        include: [
          {
            model: Estabelecimento,
            attributes: [],
          },
          {
            model: Usuario,
            attributes: [],
          },
        ],
        raw: true,
        where: { usuario_id: id },
      });
      return estabelecimentos;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async buscarFuncionarioEstabelecimento(id) {
    try {
      const estabelecimentos = await FuncionarioEstabelecimento.findAll({
        attributes: ["estabelecimento_id", "usuario_id"],
        include: [
          {
            model: Estabelecimento,
            attributes: ["cidade", "lat", "lon", "nome_estabelecimento"],
            where: { usuario_id: id },
          },
          {
            model: Usuario,
            where: { responsavel: id },
          },
        ],
        distinct: true,
      });
      const resultadoAgrupado = {};

      for (const item of estabelecimentos) {
        const estabelecimentoId = item.estabelecimento_id;
        if (!resultadoAgrupado[estabelecimentoId]) {
          resultadoAgrupado[estabelecimentoId] = {
            estabelecimento_id: estabelecimentoId,
            estabelecimento: item.estabelecimento,
            usuarios: [],
          };
        }
        resultadoAgrupado[estabelecimentoId].usuarios.push({
          usuario_id: item.usuario_id,
          nome: item.usuario.nome,
          email: item.usuario.email,
          matricula: item.usuario.matricula,
          admin: item.usuario.admin,
        });
      }

      const resultadoFinal = Object.values(resultadoAgrupado);
      return resultadoFinal;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirVinculo(id) {
    try {
      await FuncionarioEstabelecimento.destroy({ where: { id } });
      return "Vínculo Funcionário Estabelecimento excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new FuncionarioEstabelecimentoRepository();
