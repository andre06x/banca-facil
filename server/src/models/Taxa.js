import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import TipoPagamento from "./TipoPagamento.js";
import Usuario from "./Usuario.js";

const Taxa = sequelize.define(
  "taxa",
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

Taxa.belongsTo(TipoPagamento, { foreignKey: "tipo_pagamento_id" });
Taxa.belongsTo(Usuario, { foreignKey: "usuario_id" });

export default Taxa;
