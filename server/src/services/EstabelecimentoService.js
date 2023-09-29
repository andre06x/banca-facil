import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import EstabelecimentoRepository from "../repositories/EstabelecimentoRepository.js";
import FuncionarioEstabelecimento from "../controllers/FuncionarioEstabelecimento.js";
import FuncionarioEstabelecimentoRepository from "../repositories/FuncionarioEstabelecimentoRepository.js";

class EstabelecimentoService {
  async criarEstabelecimento(req) {
    try {
      const dados_estabelecimento = req.body;
      this.validarDadosEstabelecimento(dados_estabelecimento);
      await this.validarEstabelecimentoExistente(dados_estabelecimento);

      const estabelecimento =
        await EstabelecimentoRepository.criarEstabelecimento(
          dados_estabelecimento
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

  async buscarEstabelecimento(req) {
    try {
      const { id } = req.params;
      const estabelecimento =
        await EstabelecimentoRepository.buscarEstabelecimento(id);

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

  async buscarTodosEstabelecimentos(req) {
    try {
      const { usuarioid } = req.params;
      const { admin, id } = req.auth;
      let estabelecimentos;

      if (admin) {
        estabelecimentos =
          await EstabelecimentoRepository.buscarTodosEstabelecimentos(id);
      } else {
        estabelecimentos =
          await FuncionarioEstabelecimentoRepository.buscarEstabelecimentoFuncionario(
            id
          );
      }
      return {
        status: httpStatus.SUCCESS,
        content: estabelecimentos,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async editarEstabelecimento(req) {
    try {
      const { id } = req.params;
      const obj_estabelecimento = req.body;
      this.validarId(id);

      const estabelecimentoEditado =
        await EstabelecimentoRepository.editarEstabelecimento(
          id,
          obj_estabelecimento
        );
      return {
        status: httpStatus.SUCCESS,
        contant: estabelecimentoEditado,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirEstabelecimento(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const estabelecimento =
        await EstabelecimentoRepository.excluirEstabelecimento(id);
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

  async validarEstabelecimentoExistente(dados_estabelecimento) {
    const estabelecimentoExistente =
      await EstabelecimentoRepository.validarEstabelecimentoExistente(
        dados_estabelecimento
      );
    if (estabelecimentoExistente) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "O estabelecimento informado já existe em nossa base de dados."
      );
    }
  }
  validarDadosEstabelecimento(dados_estabelecimento) {
    const { usuario_id, cidade, nome_estabelecimento } = dados_estabelecimento;
    if (!usuario_id || !cidade || !nome_estabelecimento) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "Usuário, cidade ou nome da banca não informado."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}

export default new EstabelecimentoService();
