import bcrypt from "bcrypt";
import Usuario from "../../models/Usuario.js";
import Estabelecimento from "../../models/Estabelecimento.js";
import FuncionarioEstabelecimento from "../../models/FuncionarioEstabelecimento.js";
import Categoria from "../../models/Categoria.js";
import TipoPagamento from "../../models/TipoPagamento.js";
import Produto from "../../models/Produto.js";
import ProdutoTaxa from "../../models/ProdutoTaxa.js";
import Taxa from "../../models/Taxa.js";
import VendaStatus from "../../models/VendaStatus.js";
import VendaProduto from "../../models/VendaProdutos.js";

const senha = await bcrypt.hash("123456", 10);

const usuarios = [
  {
    id: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
    nome: "Bruno Correia",
    matricula: "20230828",
    email: "bruno@gmail.com",
    senha,
    ativo: true,
    admin: true,
  },

  {
    id: "98ec75f9-5827-47f4-9b24-8e94e9bcb855",
    nome: "func1",
    senha: "$2b$10$vMF.PMfdA2V2RoGNZA4pE.w6KH0v2vHkuUUlmSOcvdF2xwFlKutQK",
    email: "func5@gmail.com",
    matricula: "123",
    ativo: true,
    admin: false,
    responsavel: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
  },
];

const estabelecimentos = [
  {
    id: "53734638-03fb-44ec-ab83-c18ab8209a81",
    cidade: "NITEROI",
    lat: null,
    lon: null,
    nome_estabelecimento: "banca da amizade 3",
    usuario_id: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
  },
];

const tipos = [
  {
    id: "8dfa592e-9e72-4283-8859-cc448b8fbaac",
    tipo: "Crédito",
  },
  {
    id: "5fcdcb26-916b-49f6-b5b2-39fa7108ad0a",
    tipo: "Débito",
  },
  {
    id: "a081b295-f735-49be-9e87-fcb5edfaef0c",
    tipo: "Dinheiro",
  },
  {
    id: "b1015f6e-7a08-473a-8adf-81b6716cbbf5",
    tipo: "Pix",
  },
];

const produtos = [
  {
    id: "c937769e-68e8-4220-a12c-7d9f55c58757",
    nome: "monster",
    foto: null,
    valor: 30.9,
    quantidade_disponivel: 100,
    estabelecimento_id: "53734638-03fb-44ec-ab83-c18ab8209a81",
    categoria_id: "6187b2b6-2683-4eb7-8284-e077b1b31e3a",
  },

  {
    id: "10e96095-3629-49f7-a279-9ed4594b1a58",
    nome: "monster roxo taxa",
    foto: null,
    valor: 31.9,
    quantidade_disponivel: 100,
    estabelecimento_id: "53734638-03fb-44ec-ab83-c18ab8209a81",
    categoria_id: "6187b2b6-2683-4eb7-8284-e077b1b31e3a",
    taxa_id: "7c12de42-5efe-4e64-9921-e11bb2b844d1",
  },
];

const categorias = [
  {
    id: "6187b2b6-2683-4eb7-8284-e077b1b31e3a",
    usuario_id: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
    categoria: "bebida 2",
  },
  {
    id: "b2899eda-bae4-454f-86e2-43e82dad9ea5",
    usuario_id: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
    categoria: "bebida 2",
  },
];

const taxas = [
  {
    id: "7c12de42-5efe-4e64-9921-e11bb2b844d1",
    nome: "taxa credito adicional",
    taxa: "1.00",
    acumulativa: false,
    tipo_pagamento_id: "8dfa592e-9e72-4283-8859-cc448b8fbaac",
    usuario_id: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
  },
  {
    id: "65d4876b-c0db-497a-90f8-637712612967",
    nome: "taxa debito",
    taxa: "1.00",
    acumulativa: false,
    tipo_pagamento_id: "8dfa592e-9e72-4283-8859-cc448b8fbaac",
    usuario_id: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
  },
];

const produtos_taxa = [
  {
    id: "2c12de42-5efe-4e64-9921-e11bb2b844d1",
    produto_id: "c937769e-68e8-4220-a12c-7d9f55c58757",
    taxa_id: "7c12de42-5efe-4e64-9921-e11bb2b844d1",
  },
  {
    id: "3c12de42-5efe-4e64-9921-e11bb2b844d1",
    produto_id: "c937769e-68e8-4220-a12c-7d9f55c58757",
    taxa_id: "65d4876b-c0db-497a-90f8-637712612967",
  },
];

const venda_status = [
  {
    id: "c937769e-68e8-4220-a12c-7d9f55c58758",
    data_completa: "2023-09-21 22:04:55",
    data: "2023-09-21",
    dia: "21",
    mes: "09",
    ano: "2023",
    dia_semana: "06",
    horario_completo: "22:04:55",
    horario: "22",
    estabelecimento_id: "53734638-03fb-44ec-ab83-c18ab8209a81",
    tipo_pagamento_id: "a081b295-f735-49be-9e87-fcb5edfaef0c",
    usuario_id: "e344b1a2-7573-4a64-996d-2f40a9d65b1f",
  },
];

const venda_produto = [
  {
    id: "cc96670d-9801-46b8-845f-c1bcbe6b4e8d",
    quantidade: 2,
    produto_id: "c937769e-68e8-4220-a12c-7d9f55c58757",
    venda_status_id: "c937769e-68e8-4220-a12c-7d9f55c58758",
    valor_quantidade: 20,
    valor_quantidade_taxa: 22,
    valor_total: 22,
    valor_unitario: 15,
  },
  {
    id: "572ea6f7-6bcf-44c2-9975-5f90edcf0b10",
    quantidade: 1,
    produto_id: "10e96095-3629-49f7-a279-9ed4594b1a58",
    venda_status_id: "c937769e-68e8-4220-a12c-7d9f55c58758",
    valor_quantidade: 20,
    valor_quantidade_taxa: 2,
    valor_total: 22.0,
    valor_unitario: 15,
  },
];

export async function createInitialData() {
  try {
    await Usuario.sync({ alter: true });
    await TipoPagamento.sync({ alter: true });
    await Taxa.sync({ alter: true });
    await Estabelecimento.sync({ alter: true });
    await FuncionarioEstabelecimento.sync({ alter: true });
    await Categoria.sync({ alter: true });
    await Produto.sync({ alter: true });
    await ProdutoTaxa.sync({ alter: true });
    await VendaStatus.sync({ alter: true });
    await VendaProduto.sync({ alter: true });
    await Usuario.bulkCreate(usuarios, { ignoreDuplicates: true });
    await Estabelecimento.bulkCreate(estabelecimentos, {
      ignoreDuplicates: true,
    });

    await Categoria.bulkCreate(categorias, { ignoreDuplicates: true });
    await TipoPagamento.bulkCreate(tipos, { ignoreDuplicates: true });
    await Produto.bulkCreate(produtos, { ignoreDuplicates: true });
    await Taxa.bulkCreate(taxas, { ignoreDuplicates: true });
    await ProdutoTaxa.bulkCreate(produtos_taxa, { ignoreDuplicates: true });
    await VendaStatus.bulkCreate(venda_status, { ignoreDuplicates: true });
    await VendaProduto.bulkCreate(venda_produto, { ignoreDuplicates: true });
  } catch (err) {
    console.log("Err" + err.message);
  }
}
