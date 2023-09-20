import { APIException } from "../exception/APIException.js";

import * as httpStatus from "../config/constants/httpStatus.js";
import * as secrets from "../config/constants/secrets.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsuarioService {
  async criarUsuario(req) {
    try {
      const dados_usuario = req.body;
      this.validarDadosUsuario(dados_usuario);

      const usuario = await UsuarioRepository.criarUsuario(dados_usuario);
      return {
        status: httpStatus.SUCCESS,
        content: usuario,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async autenticar(req) {
    try {
      const { email, senha } = req.body;
      const usuario = await UsuarioRepository.findByEmail(email);
      if (!usuario) {
        throw new APIException(
          httpStatus.BAD_REQUEST,
          "Usuário não encontrado."
        );
      }

      await this.validarSenha(senha, usuario.senha);

      let auth = {
        id: usuario.id,
        admin: usuario.admin,
      };

      const accessToken = jwt.sign({ auth }, secrets.API_SECRET, {
        expiresIn: "1d",
      });

      return {
        status: httpStatus.SUCCESS,
        accessToken,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }
  async buscarUsuario(req) {
    try {
      const { admin, id: idToken } = req.auth;
      const { id } = req.params;
      const usuario = await UsuarioRepository.buscarUsuario(
        admin ? id : idToken
      );

      return {
        status: httpStatus.SUCCESS,
        content: usuario,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarTodosUsuarios() {
    try {
      const usuarios = await UsuarioRepository.buscarTodosUsuarios();
      return {
        status: httpStatus.SUCCESS,
        content: usuarios,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async editarUsuario(req) {
    try {
      const { id } = req.params;
      const obj_usuario = req.body;
      this.validarId(id);

      const usuarioEditado = await UsuarioRepository.editarUsuario(
        id,
        obj_usuario
      );

      return {
        status: httpStatus.SUCCESS,
        contant: usuarioEditado,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async excluirUsuario(req) {
    try {
      const { id } = req.params;
      this.validarId(id);
      const usuario = await UsuarioRepository.excluirUsuario(id);
      return {
        status: httpStatus.SUCCESS,
        content: usuario,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  async buscarFuncionarios(req) {
    try {
      const { usuario } = req.params;
      this.validarId(usuario);
      const funcionarios = await UsuarioRepository.buscarFuncionarios(usuario);
      return {
        status: httpStatus.SUCCESS,
        content: funcionarios,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        error: err.message,
      };
    }
  }

  validarDadosUsuario(dados_usuario) {
    const { nome, senha, email } = dados_usuario;
    if (!nome || !senha || !email) {
      throw new APIException(
        httpStatus.BAD_REQUEST,
        "Nome ou senha não enviados."
      );
    }
  }

  validarId(id) {
    if (!id) {
      throw new APIException(httpStatus.BAD_REQUEST, "Faltando id.");
    }
  }

  async validarSenha(senha, hashSenha) {
    if (!(await bcrypt.compare(senha, hashSenha))) {
      throw new APIException(httpStatus.UNAUTHORIZED, "Senha não confere.");
    }
  }
}

export default new UsuarioService();
