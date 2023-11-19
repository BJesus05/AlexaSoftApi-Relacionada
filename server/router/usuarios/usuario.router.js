import { Router } from "express"; // Asegúrate de importar express aquí
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());

// Usuario
router.get("/usuarios", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM usuario");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/usuarios/:id", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "SELECT * FROM usuario WHERE idUsuario = ?",
      [req.params.idUsuario]
    );
    console.log(result);
    if (result.length === 0) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch("/usuarios/:id", async (req, res) => {
  try {
    const { idRol } = req.body;
    console.log("IdRol para guardar: " + idRol);
    const [result] = await Pool.query(
      "UPDATE usuario SET idRol = ? WHERE idUsuario = ?",
      [idRol, req.params.idUsuario]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/usuarios/eliminar/:id", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "DELETE FROM horario WHERE idHorario = ?",
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

export { router as usuarioRouter };
export default router;
