import express from 'express'
import serviceHandler from './services'
import { getPilots } from './services/pilot/pilotController'

const app = express()

app.use(express.json())

serviceHandler()

app.get('/', async (_req, res) => {
  return res.json(await getPilots())
})

export { app }
