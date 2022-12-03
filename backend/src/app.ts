import express from 'express'
import droneHandler from './services/drone'

const app = express()

app.use(express.json())

droneHandler()

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

export { app }
