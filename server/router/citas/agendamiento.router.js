import { Router } from "express"; // Asegúrate de importar express aquí
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());

//Horario
router.get("/horario", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM horario");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/horario/:idHorario", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "SELECT * FROM horario where idHorario = ?",
      [req.params.idHorario]
    );
    console.log(result);
    if (result.length === 0) {
      res.status(404).json({ mensaje: "tarea no encontrada" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.post("/horario/registro", async (req, res) => {
  try {
    const { numeroDia, inicioJornada, finJornada, estado } = req.body;
    const [result] = await Pool.query(
      "INSERT INTO horario(numeroDia, inicioJornada, finJornada, estado) VALUES (?,?,?,?)",
      [numeroDia, inicioJornada, finJornada, estado]
    );
    res.json({
      idHorario: result.insertId,
      numeroDia,
      inicioJornada,
      finJornada,
      estado,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put("/horario/:idHorario", async (req, res) => {
  try {
    const { numeroDia, iniciojornada, finjornada, estado } = req.body;
    const [result] = await Pool.query(
      "UPDATE horario set ? where idHorario = ?",
      [req.body, req.params.idHorario]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/horario/eliminar/:idHorario", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "delete FROM horario where idHorario = ?",
      [req.params.idHorario]
    );

    if (result.affectedRows === 0) {
      res.sendStatus(404).json({ mensaje: "tarea no encontrada" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});






//Motivo cancelacion
router.get("/motivoscancelacion", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM motivoscancelacion");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/motivoscancelacion/:idMotivo", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "SELECT * FROM motivoscancelacion where idMotivo = ?",
      [req.params.idMotivo]
    );
    console.log(result);
    if (result.length === 0) {
      res.status(404).json({ mensaje: "tarea no encontrada" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.post("/motivoscancelacion/registro", async (req, res) => {
  try {
    const { motivo } = req.body;
    const [result] = await Pool.query(
      "INSERT INTO motivoscancelacion(motivo) VALUES (?)",[motivo]
    );
    res.json({
      idMotivo: result.insertId,
      motivo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put("/motivoscancelacion/editar/:idMotivo", async (req, res) => {
  try {
    const { motivo } = req.body;
    const [result] = await Pool.query(
      "UPDATE motivoscancelacion set ? where idMotivo = ?",
      [req.body, req.params.idMotivo]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/motivoscancelacion/eliminar/:idMotivo", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "delete from motivoscancelacion where idMotivo = ?",
      [req.params.idMotivo]
    );

    if (result.affectedRows === 0) {
      res.sendStatus(404).json({ mensaje: "tarea no encontrada" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// citas
router.get("/citas", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT citas.idCita, citas.fecha, citas.hora, citas.detalles, citas.estado, motivoscancelacion.motivo, usuario.nombre AS nombreUsuario, paquete.nombre, citas.idhorario FROM citas INNER JOIN motivoscancelacion ON citas.motivocancelacion = motivoscancelacion.idmotivo INNER JOIN usuario ON citas.idusuario = usuario.idusuario INNER JOIN paquete ON citas.idPaquete = paquete.idPaquete");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/citas/:idCita", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * from citas where idCita = ?", [
      req.params.idCita,
    ]);
    console.log(result);
    if (result.length === 0) {
      res.status(404).json({ mensaje: "tarea no encontrada" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.post("/citas/registro", async (req, res) => {
  try {
    const {
      fecha,
      hora,
      detalles,
      estado,
      motivoCancelacion,
      idUsuario,
      idPaquete,
      idHorario,
    } = req.body;
    const [result] = await Pool.query("INSERT INTO citas(fecha,hora,detalles,estado,motivoCancelacion,idUsuario,idPaquete,idHorario) VALUES (?,?,?,?,?,?,?,?)", [
      fecha,
      hora,
      detalles,
      estado,
      motivoCancelacion,
      idUsuario,
      idPaquete,
      idHorario,
    ]);
    res.json({
      idMotivo: result.insertId,
      fecha,
      hora,
      detalles,
      estado,
      motivoCancelacion,
      idUsuario,
      idPaquete,
      idHorario,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put("/citas/editar/:idCita", async (req, res) => {
  try {
    const {
      fecha,
      hora,
      detalles,
      estado,
      motivoCancelacion,
      idUsuario,
      idPaquete,
      idHoario,
    } = req.body;
    const [result] = await Pool.query("UPDATE citas SET ? WHERE idCita = ?", [
      req.body,
      req.params.idCita,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/citas/eliminar/:idCita", async (req, res) => {
  try {
    const [result] = await Pool.query("DELETE FROM citas WHERE idCita = ?", [
      req.params.idCita,
    ]);

    if (result.affectedRows === 0) {
      res.sendStatus(404).json({ mensaje: "tarea no encontrada" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export { router as agendamientoRouter };
export default router;
