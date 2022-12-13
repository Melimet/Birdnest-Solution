import { Sequelize } from 'sequelize'
import { DB_INFO } from './config'

const sequelize = new Sequelize(DB_INFO.DBNAME, DB_INFO.USERNAME, DB_INFO.PASSWORD, {
  host: DB_INFO.HOST,
  dialect: 'postgres',
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed')
    return process.exit(1)
  }

  return null
}

export { sequelize, connectToDatabase }
