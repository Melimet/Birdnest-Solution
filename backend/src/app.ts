import express from 'express'
import droneHandler from './services/drone'
import { getPilots } from './services/pilot/pilotController'

const app = express()

app.use(express.json())

droneHandler()

app.get('/', async (_req, res) => {
  return res.json(await getPilots())
})

export { app }
