import express from "express";
import {PORT} from "./config.js"
import tasksRouter from "./router/plantilla.router.js"
import agendamientoRouter from "./router/citas/agendamiento.router.js"

const app = express();
app.use(express.json())

app.use(tasksRouter)
app.use(agendamientoRouter)


app.listen(PORT)
console.log('server is runnning  on port 4000')