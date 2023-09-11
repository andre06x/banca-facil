import bcrypt from "bcrypt";
import Usuario from "../../models/Usuario.js";
import Estabelecimento from "../../models/Estabelecimento.js";
import FuncionariosEstabelecimento from "../../models/FuncionariosEstabelecimento.js";
import Categoria from "../../models/Categorias.js";
import Categorias from "../../models/Categorias.js";

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

export async function createInitialData() {
  try {
    await Usuario.sync({ alter: true });
    await Estabelecimento.sync({ alter: true });
    await FuncionariosEstabelecimento.sync({ alter: true });
    await Categorias.sync({ alter: true });
    await Usuario.bulkCreate(usuarios, { ignoreDuplicates: true });
  } catch (err) {
    console.log("Err" + err.message);
  }
}
