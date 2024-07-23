import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Category from "./category.models";

class Service extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
  public categoryId!: number;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Category,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: "services",
  }
);

Service.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Service, { foreignKey: "categoryId" });

export default Service;
