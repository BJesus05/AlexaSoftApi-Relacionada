import { Router } from "express";
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());

//BUSCAR VENTAS
router.get('/ventas', async (req, res) => {
    try {
        const [result] = await Pool.query("SELECT v.idVenta, v.numeroFactura, v.idCotizacion, u.nombre AS nombreColaborador, v.fecha FROM ventas v join colaboradores c on v.idColaborador = c.idColaborador join usuario u on c.idUsuario = u.idUsuario");
        //console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

});



//EXPORTAR RUTAS
export default router;