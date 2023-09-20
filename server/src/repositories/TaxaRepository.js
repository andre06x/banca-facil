import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Taxa from "../models/Taxa.js";

class TaxaRepository {
  async criarTaxa(taxaData) {
    try {
      const taxa = await Taxa.create(taxaData);
      return taxa.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }
  async buscarTaxa(id) {
    try {
      const taxa = await Taxa.findOne({
        where: { id },
      });
      return taxa;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodasTaxas(id) {
    try {
      const taxas = await Taxa.findAll({ where: { usuario_id: id } });
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
