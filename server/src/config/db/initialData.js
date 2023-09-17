import bcrypt from "bcrypt";
import Usuario from "../../models/Usuario.js";
import Estabelecimento from "../../models/Estabelecimento.js";
import FuncionariosEstabelecimento from "../../models/FuncionariosEstabelecimento.js";
import Categorias from "../../models/Categorias.js";
import TiposPagamento from "../../models/TiposPagamento.js";
import Produtos from "../../models/Produtos.js";

const senha = await bcrypt.hash("123456", 10);

const usuarios = [
  {
    nome: "Bruno Correia",
    matricula: "20230828",
    email: "bruno@gmail.com",
    senha,
    ativo: true,
    admin: true,
  },
];

const tipos = [
  { tipo: "Crédito" },
  { tipo: "Débito" },
  { tipo: "Dinheiro" },
  { tipo: "Pix" },
];

const produtos = [
  {
    nome: "iphone",
    foto: "d",
    valor: 30.9,
    quantidade_disponivel: 1,
    estabelecimento_id: "c1e6a4af-9ba9-4fa9-abed-f075f4a6c3aa",
    categoria_id: "6e01541a-abf5-4f1c-a6ca-9dad61e8ae36",
    taxas_id: "6e01541a-abf5-4f1c-a6ca-9dad61e8ae37",
  },
];

export async function createInitialData() {
  try {
    await Usuario.sync({ alter: true });
    await Estabelecimento.sync({ alter: true });
    await FuncionariosEstabelecimento.sync({ alter: true });
    await Categorias.sync({ alter: true });
    await TiposPagamento.sync({ alter: true });
    await Produtos.sync({ alter: true });
    await Usuario.bulkCreate(usuarios, { ignoreDuplicates: true });
    await TiposPagamento.bulkCreate(tipos, { ignoreDuplicates: true });
    await Produtos.bulkCreate(produtos, { ignoreDuplicates: true });
  } catch (err) {
    console.log("Err" + err.message);
  }
}
