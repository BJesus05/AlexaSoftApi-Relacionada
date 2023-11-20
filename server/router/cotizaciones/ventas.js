import { Router } from "express";
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());

//BUSCAR VENTAS
router.get('/ventas', async (req, res) => {
    try {
        const [result] = await Pool.query("select * from ventas");
        console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

});

// ELIMINAR COTIZACION
/*router.delete('/cotizaciones/:id', async (req, res) => {
    try {
        const [result] = await Pool.query("delete FROM cotizaciones where idCotizacion = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            res.sendStatus(404).json({ mensaje: "tarea no encontrada" })
        } else {
            //Pool.query("delete from destallescotizacion where idCotizacion = ?", [req.params.id])
            res.sendStatus(204)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});*/

//EXPORTAR RUTAS
export default router;