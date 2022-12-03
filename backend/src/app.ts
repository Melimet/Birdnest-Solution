import express from "express"
import pollDroneApi from "./utils/dronePoller"

const app = express()

app.use(express.json())

pollDroneApi()

app.get("/", (_req, res) => {
  res.send("Hello World!")
})

export { app }