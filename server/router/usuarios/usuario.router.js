import { Router } from "express"; // Asegúrate de importar express aquí
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());

// Usuario
router.get("/usuarios", async (req, res) => {
  try {
    const query = `
      SELECT usuario.idUsuario, usuario.nombre, usuario.cedula, usuario.correo, 
             usuario.telefono, usuario.instagram, usuario.estado, 
             usuario.fechaInteraccion, roles.nombre AS nombreRol 
      FROM usuario 
      INNER JOIN roles ON usuario.idRol = roles.idRol`;
    const [result] = await Pool.query(query);
    console.log(result);
    
    // Modificar la estructura del objeto usuario antes de enviarlo al cliente
    const usuarioRol = result.map((usuario) => ({
      ...usuario,
      idRol: usuario.nombreRol  // Cambiar el valor de idRol al nombre del rol
    }));

    res.json(usuarioRol);
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
    const { nombre, cedula, correo, telefono, instagram, estado, fechaInteraccion, idRol } = req.body;
    const [result] = await Pool.query("INSERT INTO usuario(nombre, cedula, correo, telefono, instagram, estado, fechaInteraccion, idRol) VALUES (?,?,?,?,?,?,?,?)", [nombre, cedula, correo, telefono, instagram, estado, fechaInteraccion, idRol]);
    res.json({
      idUsuario: result.insertId,
      nombre, cedula, correo, telefono, instagram, estado, fechaInteraccion, idRol
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
});

router.put("/usuarios/editar/:idUsuario", async (req, res) => {
  try {
    const { nombre, cedula, correo, telefono, instagram, estado, fechaInteraccion, idRol } = req.body;
    console.log("IdRol para guardar: " + idRol);
    const [result] = await Pool.query(
      "UPDATE usuario set nombre = ?, cedula = ?, correo = ?, telefono = ?, instagram = ?, estado = ?, fechaInteraccion = ?, idRol = ? where idUsuario = ?",
      [nombre, cedula, correo, telefono, instagram, estado, fechaInteraccion, idRol, req.params.idUsuario]
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


// Permisos
router.get("/permisos", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM permisos");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/permisos/:idPermiso", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM permisos WHERE idPermiso = ?", [
      req.params.idPermiso,
    ]);
    console.log(result);
    if (result.length === 0) {
      res.status(404).json({ mensaje: "Permiso no encontrado" });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/permisos/registrar', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await Pool.query("INSERT INTO permisos(nombre, descripcion) VALUES (?,?)", [nombre, descripcion]);
    res.json({
      idPermiso: result.insertId,
      nombre, descripcion
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
});

router.put("/permisos/editar/:idPermiso", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await Pool.query(
      "UPDATE permisos set nombre = ?, descripcion = ? where idPermiso = ?",
      [nombre, descripcion, req.params.idPermiso]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/permisos/eliminar/:idPermiso", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "DELETE FROM permisos WHERE idPermiso = ?",
      [req.params.idPermiso]
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


// Permisosx Por Rol
router.get("/permisosxrol", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT roles_permisos.idPermisoXRol, roles.nombre AS idRol, permisos.nombre AS idPermiso FROM roles_permisos INNER JOIN permisos ON roles_permisos.idPermiso = permisos.idPermiso INNER JOIN roles ON roles_permisos.idrol = roles.idrol");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/permisosxrol/:idRol", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM roles_permisos WHERE idRol = ?", [req.params.idRol]);
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/permisosxusuario/:idRol", async (req, res) => {
  try {
    const idRol = req.params.idRol;
    const [result] = await Pool.query(
      "SELECT roles_permisos.idPermisoXRol, roles.nombre AS idRol, permisos.nombre AS idPermiso FROM roles_permisos INNER JOIN permisos ON roles_permisos.idPermiso = permisos.idPermiso INNER JOIN roles ON roles_permisos.idrol = roles.idrol WHERE roles.nombre = ?",
      [idRol]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/permisosxrol/registrar', async (req, res) => {
  try {
    const { idRol, idPermiso } = req.body;
    const [result] = await Pool.query("INSERT INTO roles_permisos(idRol, idPermiso) VALUES (?,?)", [idRol, idPermiso]);
    res.json({
      idPermisoXRol: result.insertId,
      idRol, idPermiso
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })

  }
});

router.put("/permisosxrol/editar/:idPermisoXRol", async (req, res) => {
  try {
    const { idRol, idPermiso } = req.body;
    const [result] = await Pool.query(
      "UPDATE roles_permisos set idRol = ?, idPermiso = ? where idPermisoXRol = ?",
      [idRol, idPermiso, req.params.idPermisoXRol]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/permisosxrol/eliminar/:idPermisoXRol", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "DELETE FROM roles_permisos WHERE idPermisoXRol = ?",
      [req.params.idPermisoXRol]
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
