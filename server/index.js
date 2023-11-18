import express from "express";
import {PORT} from "./config.js"
import indexRouter from "./router/index.router.js";
import tasksRouter from "./router/tasks.router.js"
import agendamientoRouter from "./router/citas/agendamiento.router.js"

const app = express();
app.use(express.json())

app.use(indexRouter)
app.use(tasksRouter)
app.use(agendamientoRouter)


app.listen(PORT)
console.log('server is runnning  on port 4000')