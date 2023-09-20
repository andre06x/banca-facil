import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import TipoPagamentoRepository from "../repositories/TipoPagamentoRepository.js";

class TipoPagamentoService {
  async criarTipoPagamento(req) {
    try {
      const { tipo } = req.body;
      this.validarTiposPagamento(tipo);

      const tipoPagamento = await TipoPagamentoRepository.criarTipoPagamento(
        tipo
      );
      return {
        status: httpStatus.SUCCESS,
        content: tipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarTipoPagamento(req) {
    try {
      const { id } = req.params;
      const tipoPagamento = await TipoPagamentoRepository.buscarTipoPagamento(
        id
      );
      if (!tipoPagamento) {
        throw new APIException(
          httpStatus.NOT_FOUND,
          "Tipo pagamento não encontrado"
        );
      }

      return {
        status: httpStatus.SUCCESS,
        content: tipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarTodosTiposPagamentos() {
    try {
      const tiposPagamentos =
        await TipoPagamentoRepository.buscarTodosTiposPagamentos();
      return {
        status: httpStatus.SUCCESS,
        content: tiposPagamentos,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async editarTipoPagamento(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const obj_tipo = req.body;

      const tipoPagamento = await TipoPagamentoRepository.editarTipoPagamento(
        id,
        obj_tipo
      );
      return {
        status: httpStatus.SUCCESS,
        content: tipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirTipoPagamento(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const tipoPagamento = await TipoPagamentoRepository.excluirTipoPagamento(
        id
      );
      return {
        status: httpStatus.SUCCESS,
        content: tipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  validarTiposPagamento(tipo) {
    if (!tipo) {
      throw new APIException(httpStatus.BAD_REQUEST, "Tipo não informado.");
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}

export default new TipoPagamentoService();
