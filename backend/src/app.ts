import express from 'express'
import serviceHandler from './services'
import { getPilotsFromDb } from './services/pilot/pilotController'

const app = express()

app.use(express.json())

app.use(express.static('frontend-build'))
serviceHandler()

app.get('/api/pilots', async (_req, res) => {
  return res.json(await getPilotsFromDb())
})

export { app }
