import sequelize from "../config/db/dbConfig.js";
import Sequelize from "sequelize";
import Produto from "./Produto.js";

const VendaProduto = sequelize.define(
  "venda_produto",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    quantidade: {
      type: Sequelize.INTEGER,
    },
    valor_unitario: {
      type: Sequelize.DECIMAL(10, 2),
    },
    valor_quantidade: {
      type: Sequelize.DECIMAL(10, 2),
    },
    valor_quantidade_taxa: {
      type: Sequelize.DECIMAL(10, 2),
    },
    valor_total: {
      type: Sequelize.DECIMAL(10, 2),
    },
  },
  { underscored: true, freezeTableName: true }
);

VendaProduto.belongsTo(Produto, { foreignKey: "produto_id" });

export default VendaProduto;
