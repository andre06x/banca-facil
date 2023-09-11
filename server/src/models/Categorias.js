import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Usuario from "./Usuario.js";

const Categorias = sequelize.define(
  "categorias",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    categoria: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true, freezeTableName: true }
);

Categorias.belongsTo(Usuario, { foreignKey: "usuario_id" });
export default Categorias;
