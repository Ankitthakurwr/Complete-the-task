import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Service from "./service.models";

class ServicePriceOption extends Model {
  public id!: number;
  public duration!: string;
  public price!: number;
  public type!: string;
  public serviceId!: number;
}

ServicePriceOption.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Service,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: "servicePriceOptions",
  }
);

ServicePriceOption.belongsTo(Service, { foreignKey: "serviceId" });
Service.hasMany(ServicePriceOption, { foreignKey: "serviceId" });

export default ServicePriceOption;
