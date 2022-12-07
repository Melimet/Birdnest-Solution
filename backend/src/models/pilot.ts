import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/db"

export class Pilot extends Model { }

Pilot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    pilotId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closestDistance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastNdzBreach: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize,
    modelName: "pilot",
    timestamps: false,
  }
)

Pilot.sync()

export default Pilot
