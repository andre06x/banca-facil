import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import TipoPagamento from "../models/TipoPagamento.js";

class TipoPagamentoRepository {
  async criarTipoPagamento(tipo) {
    try {
      const tipoPagamento = await TipoPagamento.create({ tipo });
      return tipoPagamento.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTipoPagamento(id) {
    try {
      const buscarTipoPagamento = await TipoPagamento.findOne({
        where: { id },
      });
      return buscarTipoPagamento;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodosTiposPagamentos() {
    try {
      const buscarTiposPagamento = await TipoPagamento.findAll();
      return buscarTiposPagamento;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarTipoPagamento(id, obj_tipo) {
    try {
      const tipoPagamentoEditado = await TipoPagamento.update(obj_tipo, {
        where: { id },
      });
      return tipoPagamentoEditado;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirTipoPagamento(id) {
    try {
      await TipoPagamento.destroy({ where: { id } });
      return "Tipo pagamento excluído!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new TipoPagamentoRepository();
