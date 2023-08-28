import bcrypt from "bcrypt";
import Usuario from "../../models/Usuario.js";

const senha = await bcrypt.hash("123456", 10);

const usuarios = [
  {
    nome: "Bruno Correia",
    matricula: "20230828",
    senha,
    ativo: true,
    admin: true,
  },
];
export async function createInitialData() {
  try {
    await Usuario.sync({ alter: true });
    await Usuario.bulkCreate(usuarios, { ignoreDuplicates: true });
  } catch (err) {
    console.log("Err" + err.message);
  }
}
