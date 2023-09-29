import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Usuario from "./Usuario.js";

const Estabelecimento = sequelize.define(
  "estabelecimento",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    cidade: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lon: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    nome_estabelecimento: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true, freezeTableName: true }
);

Estabelecimento.belongsTo(Usuario, {
  foreignKey: "usuario_id",
  allowNull: false,
});
export default Estabelecimento;
