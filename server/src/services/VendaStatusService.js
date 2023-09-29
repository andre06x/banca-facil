import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import VendaStatusRepository from "../repositories/VendaStatusRepository.js";

class VendaStatusService {
  async criarVendaStatus(req) {
    try {
      const dados_venda_status = req.body;
      this.validarDadosVendaStatus(dados_venda_status);

      const venda_status = await VendaStatusRepository.criarVendaStatus(
        dados_venda_status
      );
      return {
        status: httpStatus.SUCCESS,
        content: venda_status,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarVendaStatus(req) {
    try {
      const { id } = req.params;
      const venda_status = await VendaStatusRepository.buscarVendaStatus(id);

      return {
        status: httpStatus.SUCCESS,
        content: venda_status,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarTodasVendasStatus(req) {
    try {
      const { estabelecimentoid } = req.params;
      const venda_status = await VendaStatusRepository.buscarTodasVendasStatus(
        estabelecimentoid
      );
      return {
        status: httpStatus.SUCCESS,
        content: venda_status,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async editarVendaStatus(req) {
    try {
      const { id } = req.params;
      const obj_venda_status = req.body;
      this.validarId(id);

      const produtoEditado = await VendaStatusRepository.editarVendaStatus(
        id,
        obj_venda_status
      );
      return {
        status: httpStatus.SUCCESS,
        contant: produtoEditado,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirVendaStatus(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const venda_status = await VendaStatusRepository.excluirVendaStatus(id);
      return {
        status: httpStatus.SUCCESS,
        content: venda_status,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async gerarUltimasVendas(req) {
    try {
      const dados_tipo_pagamento = req.body;
      const tipoPagamento = await VendaStatusRepository.gerarUltimasVendas(
        dados_tipo_pagamento
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
  async tipoPagamento(req) {
    try {
      const dados_tipo_pagamento = req.body;
      const tipoPagamento = await VendaStatusRepository.tipoPagamento(
        dados_tipo_pagamento
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

  async diasRentaveis(req) {
    try {
      const dados_tipo_pagamento = req.body;
      const diasRentaveis = await VendaStatusRepository.diasRentaveis(
        dados_tipo_pagamento
      );
      return {
        status: httpStatus.SUCCESS,
        content: diasRentaveis,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async produtosTipoPagamento(req) {
    try {
      const dados_tipo_pagamento = req.body;
      const produtosTipoPagamento =
        await VendaStatusRepository.produtosTipoPagamento(dados_tipo_pagamento);
      return {
        status: httpStatus.SUCCESS,
        content: produtosTipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async ultimosProdutosVendidos(req) {
    try {
      const dados_tipo_pagamento = req.body;
      const produtosTipoPagamento =
        await VendaStatusRepository.ultimosProdutosVendidos(
          dados_tipo_pagamento
        );
      return {
        status: httpStatus.SUCCESS,
        content: produtosTipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async tiposPagamentoProduto(req) {
    try {
      const dados_tipo_pagamento = req.body;
      const produtosTipoPagamento =
        await VendaStatusRepository.tiposPagamentoProduto(dados_tipo_pagamento);
      return {
        status: httpStatus.SUCCESS,
        content: produtosTipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async gerarProdutosVendidosRentaveis(req) {
    try {
      const dados_tipo_pagamento = req.body;
      const produtosTipoPagamento =
        await VendaStatusRepository.gerarProdutosVendidosRentaveis(
          dados_tipo_pagamento
        );
      return {
        status: httpStatus.SUCCESS,
        content: produtosTipoPagamento,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  validarDadosVendaStatus(dados_produtos) {
    const { estabelecimento_id, usuario_id, tipo_pagamento_id, produtos } =
      dados_produtos;
    if (!estabelecimento_id || !usuario_id || !tipo_pagamento_id || !produtos) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "Estabelecimento, Usuario, Tipo Pagamento ou produtos faltando."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }
}

export default new VendaStatusService();
