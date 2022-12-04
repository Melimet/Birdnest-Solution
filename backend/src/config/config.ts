import dotenv from 'dotenv';
dotenv.config() 

const PORT = process.env.PORT || 3001

const DB_INFO = {
  HOST: process.env.DB_ADDRESS,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.DB_PORT,
  DBNAME: process.env.DB_NAME,
  dialect: "postgres",
}

console.log(DB_INFO)

export { PORT, DB_INFO };