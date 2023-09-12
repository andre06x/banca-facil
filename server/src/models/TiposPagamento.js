import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";

const TiposPagamento = sequelize.define(
  "tipos_pagamento",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    tipo: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
  { underscored: true, freezeTableName: true }
);

export default TiposPagamento;
