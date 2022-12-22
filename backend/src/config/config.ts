import dotenv from 'dotenv'
import { DB_INFO_ZOD } from '../types'
dotenv.config()

const PORT = process.env.PORT || 3001

const preparseDB_INFO = {
  HOST: process.env.DB_HOST,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
  DBNAME: process.env.DB_NAME,
  dialect: 'postgres',
}

const parsedDBINFO = DB_INFO_ZOD.safeParse(preparseDB_INFO)
if (!parsedDBINFO.success) {
  throw new Error(`CRITICAL ERROR: Database info is not valid, fix environment variables.
  ${parsedDBINFO.error}}`)
}

const DB_INFO = parsedDBINFO.data

export { PORT, DB_INFO }
