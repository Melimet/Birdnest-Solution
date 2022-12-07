import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/db"

class Pilot extends Model {
  declare id: number
  declare pilotId: string
  declare firstName: string
  declare lastName: string
  declare email: string
  declare phoneNumber: string
  declare distance: number
  declare latestNdzBreach: number
}

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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    latestNdzBreach: {
      type: DataTypes.BIGINT,
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
