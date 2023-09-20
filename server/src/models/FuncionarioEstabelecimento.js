import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Usuario from "./Usuario.js";
import Estabelecimento from "./Estabelecimento.js";

const FuncionarioEstabelecimento = sequelize.define(
  "funcionario_estabelecimento",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  },
  { underscored: true, freezeTableName: true }
);

FuncionarioEstabelecimento.belongsTo(Usuario, { foreignKey: "usuario_id" });
FuncionarioEstabelecimento.belongsTo(Estabelecimento, {
  foreignKey: "estabelecimento_id",
});

export default FuncionarioEstabelecimento;
