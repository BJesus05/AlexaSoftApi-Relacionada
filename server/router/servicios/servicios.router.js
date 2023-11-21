import { Router } from "express";
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());



router.get('/servicios', async(req,res) => {
    const [result] = await Pool.query("Select * from servicios");
    //console.log(result)
    res.json(result)
});
router.get('/servicios/:idServicio' , async (req,res) => {
   try {
        const [result] = await Pool.query("Select * from servicios where idServicio = ?", [req.params.idServicio]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.post('/servicios', async (req,res) => {
    try {
        const {nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio} =req.body;
        const [result] =  await Pool.query ("INSERT INTO servicios(nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio) VALUES (?,?,?,?,?)", [nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio]);
        res.json({
            id: result.insertId,
            descripcion,
            tiempoMinutos,
            estado, 
            idCategoriaServicio
        })
    } catch (error) {
        return res.status(500).json({ message: error.message})

    }
});
router.put('/servicios/:idServicio', async(req,res) => {
   try {
        const {nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio} =req.body;
        const [result] = await Pool.query("update servicios set ? where idServicio = ?", [req.body,req.params.idServicio]);
    res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.delete('/servicios/:idServicio', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from servicios where idServicio = ?", [req.params.idServicio]);
        
        if (result.affectedRows === 0) {
             res.sendStatus(404).json({mensaje: "tarea no encontrada"})
        }else{
         res.sendStatus(204) 
    }
    } catch (error) {
        return res.status(500).json({ message: error.message})
 
}
});



//--------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------Paquetes---------------------------------------------------------------------

router.get('/paquete', async(req,res) => {
    const [result] = await Pool.query("Select * from paquete");
    console.log(result)
    res.json(result)
});
router.get('/paquete/:idPaquete' , async (req,res) => {
   try {
        const [result] = await Pool.query("Select * from paquete where idPaquete = ?", [req.params.idPaquete]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.post('/paquete', async (req,res) => {
    try {
        const {nombre, descripcion, estado} =req.body;
        const [result] =  await Pool.query ("INSERT INTO paquete(nombre, descripcion, estado) VALUES (?,?)", [nombre, descripcion, estado]);
        res.json({
            id: result.insertId,
            titulo,
            descripcion,
            estado
            
        })
    } catch (error) {
        return res.status(500).json({ message: error.message})

    }
});
router.put('/paquete/:idPaquete', async(req,res) => {
   try {
        const {nombre, descripcion, estado} =req.body;
        const [result] = await Pool.query("update paquete set ? where idPaquete = ?", [req.body,req.params.idPaquete]);
    res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.delete('/paquete/:idPaquete', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from paquete where idPaquete = ?", [req.params.idPaquete]);
        
        if (result.affectedRows === 0) {
             res.sendStatus(404).json({mensaje: "tarea no encontrada"})
        }else{
         res.sendStatus(204) 
    }
    } catch (error) {
        return res.status(500).json({ message: error.message})
 
}
});

//-----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------paquete_servicios--------------------------------------------------------

router.get('/paquete_servicios', async(req,res) => {
    const [result] = await Pool.query("Select * from paquete_servicios");
    console.log(result)
    res.json(result)
});
router.get('/paquete_servicios/:idPaqueteXServicio' , async (req,res) => {
   try {
        const [result] = await Pool.query("Select * from paquete_servicios where idPaqueteXServicio = ?", [req.params.idPaqueteXServicio]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "tarea no encontrada"})
        }
        res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.post('/paquete_servicios', async (req,res) => {
    try {
        const {idPaquete, idServicio} =req.body;
        const [result] =  await Pool.query ("INSERT INTO paquete_servicios(idPaquete, idServicio) VALUES (?,?)", [idPaquete, idServicio]);
        res.json({
            id: result.insertId,
            idPaquete, 
            idServicio
            
        })
    } catch (error) {
        return res.status(500).json({ message: error.message})

    }
});
router.put('/paquete_servicios/:idPaqueteXServicio', async(req,res) => {
   try {
        const {idPaquete, idServicio} =req.body;
        const [result] = await Pool.query("update paquete_servicios set ? where idPaqueteXServicio = ?", [req.body,req.params.idPaqueteXServicio]);
    res.json(result)
   } catch (error) {
    return res.status(500).json({ message: error.message})

   }
});
router.delete('/paquete_servicios/:idPaqueteXServicio', async(req,res) => {
    try {
            const [result] = await Pool.query("delete from paquete_servicios where idPaqueteXServicio = ?", [req.params.idPaqueteXServicio]);
        
        if (result.affectedRows === 0) {
             res.sendStatus(404).json({mensaje: "tarea no encontrada"})
        }else{
         res.sendStatus(204) 
    }
    } catch (error) {
        return res.status(500).json({ message: error.message})
 
}
});

export { router as serviciosRouter };
export default router;


