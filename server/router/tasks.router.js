import { Router } from "express";
import { Pool } from "../db";
const router = Router();

router.get('/tasks',(req,res) => {
    res.send('Obteniendo tarea')
});
router.get('/tasks/:id' , (req,res) => {
    res.send('Obteniendo una tarea')
});
router.post('/tasks', async (req,res) => {
    const {titulo, descripcion} =req.body;
    const result =  await Pool.query ("INSERT INTO tasks(titulo, descripcion) VALUES (?,?)", [titulo, descripcion]);
    console.log(result)
    res.send('Creando tarea')
});
router.put('/tasks/:id',(req,res) => {
    res.send('Editando tarea')
});
router.delete('/tasks/:id',(req,res) => {
    res.send('eliminando  tarea')
});

export default router;


