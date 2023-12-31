import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import TaxaRepository from "../repositories/TaxaRepository.js";

class TaxaService {
  async criarTaxa(req) {
    try {
      const obj_taxa = req.body;

      this.validarTaxa(obj_taxa);
      await this.validarTaxaExistente(obj_taxa);

      const taxaCriada = await TaxaRepository.criarTaxa(obj_taxa);
      return {
        status: httpStatus.SUCCESS,
        content: taxaCriada,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }
  async buscarTaxa(req) {
    try {
      const { id } = req.params;
      const taxaEncontrada = await TaxaRepository.buscarTaxa(id);
      if (!taxaEncontrada) {
        throw new APIException(httpStatus.NOT_FOUND, "Taxa nao encontrada");
      }
      return {
        status: httpStatus.SUCCESS,
        content: taxaEncontrada,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarTodasTaxas(req) {
    try {
      const { usuarioid } = req.params;
      this.validarId(usuarioid);
      const todasTaxas = await TaxaRepository.buscarTodasTaxas(usuarioid);

      return {
        status: httpStatus.SUCCESS,
        content: todasTaxas,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }
  async editarTaxa(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const obj_taxa = req.body;

      const taxaEditada = await TaxaRepository.editarTaxa(id, obj_taxa);
      return {
        status: httpStatus.SUCCESS,
        content: taxaEditada,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }
  async excluirTaxa(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const taxaExcluida = await TaxaRepository.excluirTaxa(id);

      return {
        status: httpStatus.SUCCESS,
        content: taxaExcluida,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async validarTaxaExistente(obj_taxa) {
    const taxaExistente = await TaxaRepository.validarTaxaExistente(obj_taxa);
    if (taxaExistente) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "O nome da taxa já existente. Por favor, informe um novo nome."
      );
    }
  }
  validarTaxa(obj_taxa) {
    if (
      !obj_taxa ||
      !obj_taxa.nome ||
      !obj_taxa.tipo_pagamento_id ||
      !obj_taxa.taxa ||
      obj_taxa.acumulativa === undefined
    ) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "Dados para a criação da taxa incompletos."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}
export default new TaxaService();
