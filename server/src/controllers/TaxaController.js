import TaxaService from "../services/TaxaService.js";

class TaxaController {
  async criarTaxa(req, res) {
    const taxa = await TaxaService.criarTaxa(req);
    return res.status(taxa.status).json(taxa);
  }
  async buscarTaxa(req, res) {
    const taxa = await TaxaService.buscarTaxa(req);
    return res.status(taxa.status).json(taxa);
  }
  async buscarTodasTaxass(req, res) {
    const taxas = await TaxaService.buscarTodasTaxas(req);
    return res.status(taxas.status).json(taxas);
  }
  async editarTaxa(req, res) {
    const taxa = await TaxaService.editarTaxa(req);
    return res.status(taxa.status).json(taxa);
  }
  async excluirTaxa(req, res) {
    const taxa = await TaxaService.excluirTaxa(req);
    return res.status(taxa.status).json(taxa);
  }
}
export default new TaxaController();
