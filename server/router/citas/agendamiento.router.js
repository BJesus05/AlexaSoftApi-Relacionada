import { Router } from "express";
import { Pool } from "../../db.js";
const router = Router();

//Horario
router.get('/horario', async(req,res) => {
    try {
        const [result] = await Pool.query("Select * from horario");
        console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
   
});
router.get('/horario/:idHorario' , async (req,res) => {

    try{
        const [result] = await Pool.query("Select * from horario where idHorario = ?", [req.params.idHorario]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
    }catch(error){
        return res.status(500).json({ message: error.message})
    }

});
router.post('/horario', async (req,res) => {
    try{
        const {numeroDia, iniciojornada, finjornada, estado} =req.body;
        const [result] =  await Pool.query ("INSERT INTO horario(fecha, iniciojornada, finjornada) VALUES (?,?)", [numeroDia, iniciojornada, finjornada,estado]);
        res.json({
            idHorario: result.insertId,
            numeroDia,
            iniciojornada,
            finjornada,
            estado
        })
    }catch(error){
        return res.status(500).json({ message: error.message})
    }
});
router.put('/horario/:idHorario', async(req,res) => {
    try {
        const {numeroDia, iniciojornada, finjornada, estado} =req.body;
        const [result] = await Pool.query("update horario set ? where idHorario = ?", [req.body,req.params.idHorario]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});
router.delete('/horario/:idHorario', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from horario where idHorario = ?", [req.params.idHorario]);
        
        if (result.affectedRows === 0) {
             res.sendStatus(404).json({mensaje: "tarea no encontrada"})
        }else{
         res.sendStatus(204) 
    }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});






//Motivo cancelacion
router.get('/motivocancelacion', async(req,res) => {
    try {
        const [result] = await Pool.query("Select * from motivocancelacion");
        console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
   
});
router.get('/motivocancelacion/:idMotivo' , async (req,res) => {

    try{
        const [result] = await Pool.query("Select * from motivocancelacion where idMotivo = ?", [req.params.idMotivo]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
    }catch(error){
        return res.status(500).json({ message: error.message})
    }

});
router.post('/motivocancelacion', async (req,res) => {
    try{
        const {motivo} =req.body;
        const [result] =  await Pool.query ("INSERT INTO motivocancelacion(motivo) VALUES (?)", [motivo]);
        res.json({
            idMotivo: result.insertId,
            numeroDia,
            iniciojornada,
            finjornada,
            estado
        })
    }catch(error){
        return res.status(500).json({ message: error.message})
    }
});
router.put('/motivocancelacion/:idMotivo', async(req,res) => {
    try {
        const {motivo} =req.body;
        const [result] = await Pool.query("update motivocancelacion set ? where idMotivo = ?", [req.body,req.params.idMotivo]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});
router.delete('/motivocancelacion/:idMotivo', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from motivocancelacion where idMotivo = ?", [req.params.idMotivo]);
        
        if (result.affectedRows === 0) {
             res.sendStatus(404).json({mensaje: "tarea no encontrada"})
        }else{
         res.sendStatus(204) 
    }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});







//Motivo citas
router.get('/motivocancelacion', async(req,res) => {
    try {
        const [result] = await Pool.query("Select * from motivocancelacion");
        console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
   
});
router.get('/motivocancelacion/:idMotivo' , async (req,res) => {

    try{
        const [result] = await Pool.query("Select * from motivocancelacion where idMotivo = ?", [req.params.idMotivo]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
    }catch(error){
        return res.status(500).json({ message: error.message})
    }

});
router.post('/motivocancelacion', async (req,res) => {
    try{
        const {motivo} =req.body;
        const [result] =  await Pool.query ("INSERT INTO motivocancelacion(motivo) VALUES (?)", [motivo]);
        res.json({
            idMotivo: result.insertId,
            numeroDia,
            iniciojornada,
            finjornada,
            estado
        })
    }catch(error){
        return res.status(500).json({ message: error.message})
    }
});
router.put('/motivocancelacion/:idMotivo', async(req,res) => {
    try {
        const {motivo} =req.body;
        const [result] = await Pool.query("update motivocancelacion set ? where idMotivo = ?", [req.body,req.params.idMotivo]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});
router.delete('/motivocancelacion/:idMotivo', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from motivocancelacion where idMotivo = ?", [req.params.idMotivo]);
        
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