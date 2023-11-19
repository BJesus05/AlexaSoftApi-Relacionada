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
router.post('/horario/registro', async (req,res) => {
    try{
        const {numeroDia, inicioJornada, finJornada, estado} =req.body;
        const [result] =  await Pool.query ("INSERT INTO horario(numeroDia , inicioJornada, finJornada,estado) VALUES (?,?,?,?)", [numeroDia, inicioJornada, finJornada,estado]);
        res.json({
            idHorario: result.insertId,
            numeroDia,
            inicioJornada,
            finJornada,
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
router.get('/motivoscancelacion', async(req,res) => {
    try {
        const [result] = await Pool.query("Select * from motivoscancelacion");
        console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
   
});
router.get('/motivoscancelacion/:idMotivo' , async (req,res) => {

    try{
        const [result] = await Pool.query("Select * from motivoscancelacion where idMotivo = ?", [req.params.idMotivo]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
    }catch(error){
        return res.status(500).json({ message: error.message})
    }

});
router.post('/motivoscancelacion', async (req,res) => {
    try{
        const {motivo} =req.body;
        const [result] =  await Pool.query ("INSERT INTO motivoscancelacion(motivo) VALUES (?)", [motivo]);
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
router.put('/motivoscancelacion/:idMotivo', async(req,res) => {
    try {
        const {motivo} =req.body;
        const [result] = await Pool.query("update motivoscancelacion set ? where idMotivo = ?", [req.body,req.params.idMotivo]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});
router.delete('/motivoscancelacion/:idMotivo', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from motivoscancelacion where idMotivo = ?", [req.params.idMotivo]);
        
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
router.get('/citas', async(req,res) => {
    try {
        const [result] = await Pool.query("Select * from citas");
        console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
   
});
router.get('/citas/:idCita' , async (req,res) => {

    try{
        const [result] = await Pool.query("Select * from citas where idCita = ?", [req.params.idCita]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
    }catch(error){
        return res.status(500).json({ message: error.message})
    }

});
router.post('/citas', async (req,res) => {
    try{
        const {fecha,hora,detalle,estado,motivoCancelamiento,idUsuario,idPaquete,idHoario} =req.body;
        const [result] =  await Pool.query ("INSERT INTO citas(motivo) VALUES (?)", [fecha,hora,detalle,estado,motivoCancelamiento,idUsuario,idPaquete,idHoario]);
        res.json({
            idMotivo: result.insertId,
            fecha,
            hora,
            detalle,
            estado,
            motivoCancelamiento,
            idUsuario,
            idPaquete,
            idHoario
        })
    }catch(error){
        return res.status(500).json({ message: error.message})
    }
});
router.put('/citas/:idCita', async(req,res) => {
    try {
        const {fecha,hora,detalle,estado,motivoCancelamiento,idUsuario,idPaquete,idHoario} =req.body;
        const [result] = await Pool.query("update citas set ? where idCita = ?", [req.body,req.params.idCita]);
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});
router.delete('/citas/:idCita', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from citas where idCita = ?", [req.params.idCita]);
        
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