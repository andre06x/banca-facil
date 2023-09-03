import { APIException } from "../exception/APIException.js";
import * as httpStatus from "../config/constants/httpStatus.js";
import Usuario from "../models/Usuario.js";
import { log } from "console";
import { hash } from "bcrypt";

class UsuarioRepository {
  async criarUsuario(dados_usuario) {
    try {
      const { nome, senha: temporaria, email, responsavel } = dados_usuario;
      const senha = await hash(temporaria, 10);
      const data = {
        nome,
        senha,
        email,
        matricula: "123",
        ativo: true,
        admin: responsavel ? false : true,
        responsavel: responsavel ? responsavel : null,
      };
      const usuario = await Usuario.create(data);
      return usuario.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarUsuario(id) {
    try {
      log(id);
      const usuario = await Usuario.findOne({ where: { id } });
      return usuario.dataValues;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async buscarTodosUsuarios() {
    try {
      const usuario = await Usuario.findAll();
      return usuario;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async editarUsuario(id, obj_usuario) {
    try {
      const data = await Usuario.update(obj_usuario, { where: { id } });
      return data;
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async excluirUsuario(id) {
    try {
      await Usuario.destroy({ where: { id } });
      return "Usuário excluído com sucesso!";
    } catch (err) {
      throw new APIException(httpStatus.BAD_REQUEST, err.message);
    }
  }

  async findByEmail(email) {
    try {
      return await Usuario.findOne({ where: { email } });
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }

  async buscarFuncionarios(id) {
    try {
      return await Usuario.findAll({ where: { responsavel: id } });
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
}

export default new UsuarioRepository();
