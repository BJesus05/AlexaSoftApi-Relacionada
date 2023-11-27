import { Router } from "express";
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());

//BUSCAR COTIZACIONES
router.get('/cotizaciones', async (req, res) => {
    try {
        const [result] = await Pool.query(`
        SELECT 
        c.idCotizacion,
    cli.nombre AS nombreCliente,
    c.fechaCreacion AS cotizacion_fechaCreacion,
    c.fechaFinalizacion AS cotizacion_fechaFinalizacion,
    c.estado,
    CONCAT(GROUP_CONCAT(DISTINCT CONCAT(p.nombre, ' - ', d.unidadesXproducto) ORDER BY p.idProducto SEPARATOR ', ')) AS productos,
    SUM(d.subtotal) AS total
    FROM cliente cli JOIN cotizaciones c ON cli.idCliente = c.idCliente JOIN detallescotizacion d ON c.idCotizacion = d.idCotizacion JOIN productos p ON d.idProducto = p.idProducto
    GROUP BY c.idCotizacion;
        `);
        //console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

});

//OBTENER UNA COTIZACION
router.get('/cotizaciones/:id', async (req, res) => {

    try {
        const [result] = await Pool.query(`
        SELECT 
        c.idCotizacion,
    cli.nombre AS nombreCliente,
    c.fechaCreacion AS cotizacion_fechaCreacion,
    c.fechaFinalizacion AS cotizacion_fechaFinalizacion,
    c.estado,
    CONCAT(GROUP_CONCAT(DISTINCT CONCAT(p.nombre, ' - ', d.unidadesXproducto) ORDER BY p.idProducto SEPARATOR ', ')) AS productos,
    SUM(d.subtotal) AS total
    FROM cliente cli JOIN cotizaciones c ON cli.idCliente = c.idCliente JOIN detallescotizacion d ON c.idCotizacion = d.idCotizacion JOIN productos p ON d.idProducto = p.idProducto
    where c.idCotizacion = ?
    GROUP BY idCotizacion

        `, [req.params.id]);
        console.log(result);

        if (result.length === 0) {
            console.log(`Cotización con ID ${req.params.id} no encontrada.`);
            res.status(404).json({
                error: {
                    message: "Cotización no encontrada",
                    code: 404
                }
            });
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error(`Error al buscar la cotización: ${error.message}`);
        return res.status(500).json({ error: { message: "Error interno del servidor" } });

    }

});

//ACTUALIZAR ESTADO DE COTIZAICION
router.patch("/cotizaciones/:id", async (req, res) => {
    try {
        const { estado } = req.body
        //console.log("Estado para guardar    " + estado)
        const [result] = await Pool.query(
            "UPDATE cotizaciones set estado = ? where idCotizacion = ?",
            [estado, req.params.id]
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// ELIMINAR COTIZACION
router.delete('/cotizaciones/:id', async (req, res) => {
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
});

//EXPORTAR RUTAS
export default router;