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

router.get('/ventas/c', async (req, res) => {
    try {
        const [result] = await Pool.query("SELECT c.idColaborador, u.nombre  from colaboradores c join usuario u on c.idUsuario = u.idUsuario where u.estado = 'habilitado'");
        //console.log(result)
        res.json(result)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

});


router.post("/ventas", async (req, res) => {
    try {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual
            .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .replace(/\//g, ''); 

        const [ultimoNumero] = await Pool.query("SELECT MAX(numeroFactura) as ultimoNumero FROM ventas");
        let nuevoNumero = 1;
        if (ultimoNumero[0].ultimoNumero) {
            nuevoNumero = parseInt(ultimoNumero[0].ultimoNumero.split('VEN')[1]) + 1;
        }

        const numFac = "VEN" + fechaFormateada + nuevoNumero.toString().padStart(3, '0');

        const { idColaborador,idCotizacion } = req.body
      const [result] = await Pool.query(
        "INSERT INTO ventas(numeroFactura, idCotizacion, idColaborador, fecha) VALUES (?,?,?,CURRENT_TIMESTAMP)",
        [numFac, idCotizacion, idColaborador]
      );
      res.json({result});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });



//EXPORTAR RUTAS
export default router;