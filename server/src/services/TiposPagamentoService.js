import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import TiposPagamentoRepository from "../repositories/TiposPagamentoRepository.js";

class TiposPagamentoService {
  async criarTiposPagamento(req) {
    try {
      const { tipo } = req.body;
      this.validarTiposPagamento(tipo);

      const tipoPagamento = await TiposPagamentoRepository.criarTiposPagamento(
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
      const tipoPagamento = await TiposPagamentoRepository.buscarTipoPagamento(
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

  async buscarTodosTiposPagamento() {
    try {
      const tiposPagamento =
        await TiposPagamentoRepository.buscarTodosTiposPagamento();
      return {
        status: httpStatus.SUCCESS,
        content: tiposPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async editarTiposPagamento(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const obj_tipo = req.body;

      const tiposPagamento =
        await TiposPagamentoRepository.editarTiposPagamento(id, obj_tipo);
      return {
        status: httpStatus.SUCCESS,
        content: tiposPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirTiposPagamento(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const tipoPagamento =
        await TiposPagamentoRepository.excluirTiposPagamento(id);
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

export default new TiposPagamentoService();
