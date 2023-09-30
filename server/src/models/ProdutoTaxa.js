import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Taxa from "./Taxa.js"; // Importe o modelo 'Taxa' após as declarações acima

const ProdutoTaxa = sequelize.define(
  "produto_taxa",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
  },
  { underscored: true, freezeTableName: true }
);

ProdutoTaxa.belongsTo(Taxa, { foreignKey: "taxa_id" });
export default ProdutoTaxa;
