import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import TipoPagamento from "./TipoPagamento.js";
import Usuario from "./Usuario.js";
import VendaProduto from "./VendaProdutos.js";
import Estabelecimento from "./Estabelecimento.js";

const VendaStatus = sequelize.define(
  "venda_status",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    data_completa: {
      type: Sequelize.DATE,
    },
    data: {
      type: Sequelize.STRING,
    },

    dia: {
      type: Sequelize.STRING,
    },
    mes: {
      type: Sequelize.STRING,
    },
    ano: {
      type: Sequelize.STRING,
    },
    dia_semana: {
      type: Sequelize.STRING,
    },
    horario_completo: {
      type: Sequelize.STRING,
    },
    horario: {
      type: Sequelize.STRING,
    },
    valor_total: {
      type: Sequelize.DECIMAL(10, 2),
    },
  },
  { underscored: true, freezeTableName: true }
);

VendaStatus.hasMany(VendaProduto, { foreignKey: "venda_status_id" });
VendaStatus.belongsTo(Estabelecimento, { foreignKey: "estabelecimento_id" });
VendaStatus.belongsTo(TipoPagamento, { foreignKey: "tipo_pagamento_id" });
VendaStatus.belongsTo(Usuario, { foreignKey: "usuario_id" });
export default VendaStatus;
