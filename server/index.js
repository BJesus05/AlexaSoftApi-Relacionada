import express from "express";
import {PORT} from "./config.js"
import agendamientoRouter from "./router/citas/agendamiento.router.js"
import cotizacionesRouter from "./router/cotizaciones/cotizaciones.router.js"

const app = express();
app.use(express.json())

app.use(agendamientoRouter)
app.use(cotizacionesRouter)


app.listen(PORT)
console.log('Servidor inicio con exito: 4000')