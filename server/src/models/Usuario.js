import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    matricula: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ativo: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    responsavel: {
      type: Sequelize.UUID,
      allowNull: true,
    },
  },
  {}
);

export default Usuario;
