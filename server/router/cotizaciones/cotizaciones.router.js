import { Router } from "express"; // Asegúrate de importar express aquí
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());

//Cotizaciones
router.get('/cotizaciones', async(req,res) => {
    try {
        const queryBuscar=`
        SELECT 
    cli.idCliente AS id,
    cli.nombre AS nombreCliente,
    c.idCotizacion,
    c.fechaCreacion AS cotizacion_fechaCreacion,
    c.fechaFinalizacion AS cotizacion_fechaFinalizacion,
    c.estado AS cotizacion_estado,
    SUM(d.subtotal) AS total,
    CONCAT(GROUP_CONCAT(DISTINCT CONCAT(p.nombre, ' - ', d.unidadesXproducto) ORDER BY p.idProducto SEPARATOR ', ')) AS productos
    FROM cliente cli JOIN cotizaciones c ON cli.idCliente = c.idCliente JOIN detallescotizacion d ON c.idCotizacion = d.idCotizacion JOIN productos p ON d.idProducto = p.idProducto
    GROUP BY c.idCotizacion;
        `;
        const [result] = await Pool.query(queryBuscar);
        console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
   
});

router.get('/cotizaciones/:id' , async (req,res) => {

    try{
        const [result] = await Pool.query("SELECT * FROM cotizaciones where idCotizacion = ?", [req.params.id]);
        console.log(result)
        if (result.length === 0) {
            res.status(404).json({mensaje: "Cotizacion no encontrada"})
        }
        res.json(result)
    }catch(error){
        return res.status(500).json({ message: error.message})
    }

});

router.delete('/cotizaciones/:id', async(req,res) => {
    try {
            const [result] = await Pool.query("delete FROM cotizacion where idCotizacion = ?", [req.params.id]);
        
        if (result.affectedRows === 0) {
             res.sendStatus(404).json({mensaje: "tarea no encontrada"})
        }else{
            Pool.query("delete from destallescotizacion where idCotizacion = ?", [req.params.id])
         res.sendStatus(204) 
    }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
});


export { router as cotizacionesRouter };
export default router;