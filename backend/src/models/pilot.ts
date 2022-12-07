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
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latestNdzBreach: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
