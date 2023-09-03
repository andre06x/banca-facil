import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Usuario from "./Usuario.js";
import Estabelecimento from "./Estabelecimento.js";

const FuncionariosEstabelecimento = sequelize.define(
  "funcionarios_estabelecimento",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  },
  { underscored: true, freezeTableName: true }
);

FuncionariosEstabelecimento.belongsTo(Usuario, { foreignKey: "usuario_id" });
FuncionariosEstabelecimento.belongsTo(Estabelecimento, {
  foreignKey: "estabelecimento_id",
});

export default FuncionariosEstabelecimento;
