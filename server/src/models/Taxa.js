import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import TiposPagamento from "./TiposPagamento.js";

const Taxa = sequelize.define(
  "taxas",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
    },
    taxa: {
      type: Sequelize.DECIMAL(10, 2),
    },
    acumulativa: {
      type: Sequelize.BOOLEAN,
    },
  },
  { underscored: true, freezeTableName: true }
);

Taxa.belongsTo(TiposPagamento, { foreignKey: "tipo_pagamento_id" });

export default Taxa;
