import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import TiposPagamento from "../models/TiposPagamento.js";

class TiposPagamentoRepository {
  async criarTiposPagamento(tipo) {
    try {
      const tipoPagamento = await TiposPagamento.create({ tipo });
      return tipoPagamento.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTipoPagamento(id) {
    try {
      const buscarTipoPagamento = await TiposPagamento.findOne({
        where: { id },
      });
      return buscarTipoPagamento;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodosTiposPagamento() {
    try {
      const buscarTiposPagamento = await TiposPagamento.findAll();
      return buscarTiposPagamento;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarTiposPagamento(id, obj_tipo) {
    try {
      const tipoPagamentoEditado = await TiposPagamento.update(obj_tipo, {
        where: { id },
      });
      return tipoPagamentoEditado;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirTiposPagamento(id) {
    try {
      await TiposPagamento.destroy({ where: { id } });
      return "Tipo pagamento excluído!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new TiposPagamentoRepository();
