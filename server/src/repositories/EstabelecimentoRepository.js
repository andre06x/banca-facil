import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Estabelecimento from "../models/Estabelecimento.js";
import VendaStatus from "../models/VendaStatus.js";

class EstabelecimentoRepository {
  async criarEstabelecimento(dados_estabelecimento) {
    try {
      const { usuario_id, cidade, lat, lon, nome_estabelecimento } =
        dados_estabelecimento;
      const data = {
        usuario_id,
        cidade,
        nome_estabelecimento,
        lat: lat ? lat : null,
        lon: lon ? long : null,
      };
      const estabelecimento = await Estabelecimento.create(data);
      return estabelecimento.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async validarEstabelecimentoExistente(dados_estabelecimento) {
    const { nome_estabelecimento, usuario_id } = dados_estabelecimento;
    try {
      const estabelecimento = await Estabelecimento.findOne({
        where: { nome_estabelecimento, usuario_id },
      });
      return estabelecimento?.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async buscarEstabelecimento(id) {
    try {
      const estabelecimento = await Estabelecimento.findOne({ where: { id } });
      return estabelecimento.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodosEstabelecimentos(id) {
    try {
      const estabelecimentos = await VendaStatus.findAll({
        attributes: [],
        where: { usuario_id: id },
        include: {
          model: Estabelecimento,
          left: true,
        },
      });
      return estabelecimentos;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarEstabelecimento(id, obj_estabelecimento) {
    try {
      const data = await Estabelecimento.update(obj_estabelecimento, {
        where: { id },
      });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirEstabelecimento(id) {
    try {
      await Estabelecimento.destroy({ where: { id } });
      return "Estabelecimento excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new EstabelecimentoRepository();
