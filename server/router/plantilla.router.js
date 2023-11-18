import { Router } from "express";
import { Pool } from "../db.js";
const router = Router();

router.get('/tasks', async(req,res) => {
    const [result] = await Pool.query("Select * from tasks order by titulo");
    console.log(result)
    res.json(result)
});
router.get('/tasks/:id' , async (req,res) => {
   try {
        const [result] = await Pool.query("Select * from tasks where id = ?", [req.params.id]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.post('/tasks', async (req,res) => {
    try {
        const {titulo, descripcion} =req.body;
        const [result] =  await Pool.query ("INSERT INTO tasks(titulo, descripcion) VALUES (?,?)", [titulo, descripcion]);
        res.json({
            id: result.insertId,
            titulo,
            descripcion
        })
    } catch (error) {
        return res.status(500).json({ message: error.message})

    }
});
router.put('/tasks/:id', async(req,res) => {
   try {
        const {titulo, descripcion} =req.body;
        const [result] = await Pool.query("update tasks set ? where id = ?", [req.body,req.params.id]);
    res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.delete('/tasks/:id', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from tasks where id = ?", [req.params.id]);
        
        if (result.affectedRows === 0) {
             res.sendStatus(404).json({mensaje: "tarea no encontrada"})
        }else{
         res.sendStatus(204) 
    }
    } catch (error) {
        return res.status(500).json({ message: error.message})
 
}
});

export default router;


