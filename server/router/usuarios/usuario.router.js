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

router.get("/usuarios/:idUsuario", async (req, res) => {
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

router.post('/usuarios/registrar', async (req, res) => {
  try {
    const { nombre, cedula, correo, telefono, instagram, contrasena, estado, fechaInteraccion, idRol } = req.body;
    const [result] = await Pool.query("INSERT INTO usuario(nombre, cedula, correo, telefono, instagram, contrasena, estado, fechaInteraccion, idRol) VALUES (?,?,?,?,?,?,?,?,?)", [nombre, cedula, correo, telefono, instagram, contrasena, estado, fechaInteraccion, idRol]);
    res.json({
      idUsuario: result.insertId,
      nombre, cedula, correo, telefono, instagram, contrasena, estado, fechaInteraccion, idRol
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
});

router.put("/usuarios/editar/:idUsuario", async (req, res) => {
  try {
    const { nombre, cedula, correo, telefono, instagram, contrasena, estado, fechaInteraccion, idRol } = req.body;
    console.log("IdRol para guardar: " + idRol);
    const [result] = await Pool.query(
      "UPDATE usuario set nombre = ?, cedula = ?, correo = ?, telefono = ?, instagram = ?, contrasena = ?, estado = ?, fechaInteraccion = ?, idRol = ? where idUsuario = ?",
      [nombre, cedula, correo, telefono, instagram, contrasena, estado, fechaInteraccion, idRol, req.params.idUsuario]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/usuarios/eliminar/:idUsuario", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "DELETE FROM usuario WHERE idUsuario = ?",
      [req.params.idUsuario]
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

// Roles
router.get("/roles", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM roles");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/roles/:idRol", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM roles WHERE idRol = ?", [
      req.params.idRol,
    ]);
    console.log(result);
    if (result.length === 0) {
      res.status(404).json({ mensaje: "Rol no encontrado" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/roles/registrar', async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const [result] = await Pool.query("INSERT INTO roles(nombre, estado) VALUES (?,?)", [nombre, estado]);
    res.json({
      idRol: result.insertId,
      nombre, estado 
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
});

router.put("/roles/editar/:idRol", async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const [result] = await Pool.query(
      "UPDATE roles set nombre = ?, estado = ? where idRol = ?",
      [nombre, estado, req.params.idRol]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/roles/eliminar/:idRol", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "DELETE FROM roles WHERE idRol = ?",
      [req.params.idRol]
    );

    if (result.affectedRows === 0) {
      res.sendStatus(404).json({ mensaje: "Tarea no encontrada" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export { router as usuarioRouter };
export default router;
