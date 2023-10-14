import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Taxa from "../models/Taxa.js";
import TipoPagamento from "../models/TipoPagamento.js";

class TaxaRepository {
  async criarTaxa(taxaData) {
    try {
      const taxa = await Taxa.create(taxaData);
      return this.buscarTaxa(taxa.dataValues.id);
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async validarTaxaExistente(obj_taxa) {
    try {
      const taxa = await Taxa.findOne({
        where: { nome: obj_taxa.nome, usuario_id: obj_taxa.usuario_id },
      });
      return taxa;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTaxa(id) {
    try {
      const taxa = await Taxa.findOne({
        where: { id },
        include: TipoPagamento,
      });
      return taxa;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodasTaxas(id) {
    try {
      const taxas = await Taxa.findAll({
        where: { usuario_id: id },
        include: TipoPagamento,
      });
      return taxas;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async editarTaxa(id, obj_taxa) {
    try {
      const taxaEditada = await Taxa.update(obj_taxa, {
        where: { id },
      });
      return taxaEditada;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async excluirTaxa(id) {
    try {
      await Taxa.destroy({
        where: { id },
      });
      return "taxa excluida";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
}
export default new TaxaRepository();
