import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import FuncionariosEstabelecimentoRepository from "../repositories/FuncionariosEstabelecimentoRepository.js";

class FuncionariosEstabelecimentoService {
  async vincularFuncionarioEstabelecimento(req) {
    try {
      const dados = req.body;
      this.validarDadosEstabelecimento(dados);

      const estabelecimento = await FuncionariosEstabelecimentoRepository.criarVinculo(
        dados
      );
      return {
        status: httpStatus.SUCCESS,
        content: estabelecimento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }
  async buscarFuncionarioEstabelecimento(req) {
    try {
      const { id } = req.params;
      this.validarId(id);

      const estabelecimento =
        await FuncionariosEstabelecimentoRepository.buscarFuncionarioEstabelecimento(id);
      return {
        status: httpStatus.SUCCESS,
        content: estabelecimento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirVicnuloFuncionarioEstabelecimento(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const estabelecimento = await FuncionariosEstabelecimentoRepository.excluirVinculo(
        id
      );
      return {
        status: httpStatus.SUCCESS,
        content: estabelecimento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  validarDadosEstabelecimento(dados) {
    const { usuario_id, estabelecimento_id } = dados;
    if (!usuario_id || !estabelecimento_id) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "Usuário ou estabelecimento não informado."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}

export default new FuncionariosEstabelecimentoService();
