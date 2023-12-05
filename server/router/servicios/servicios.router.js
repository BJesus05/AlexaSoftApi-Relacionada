import { Router } from "express";
import { Pool } from "../../db.js";
import cors from "cors";

const router = Router();
router.use(cors());


//Servicios
router.get("/servicios", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM servicios");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/servicios/:idServicio", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "SELECT * FROM servicios where idServicio = ?",
      [req.params.idServicio]
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
router.post("/servicios/registro", async (req, res) => {
  try {
    const { nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio } = req.body;
    const [result] = await Pool.query(
      "INSERT INTO servicios(nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio) VALUES (?,?,?,?,?)",
      [nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio]
    );
    res.json({
      idServicio: result.insertId,
      nombre,
      descripcion,
      tiempoMinutos,
      estado,
      idCategoriaServicio,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put("/servicios/editar/:idServicio", async (req, res) => {
  try {
    const { nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio } = req.body;
    const [result] = await Pool.query(
      "UPDATE servicios set nombre=?, descripcion=?, tiempoMinutos=?, estado=?, idCategoriaServicio=? where idServicio = ?",
      [nombre, descripcion, tiempoMinutos, estado, idCategoriaServicio, req.params.idServicio]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/servicios/eliminar/:idServicio", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "delete FROM servicios where idServicio = ?",
      [req.params.idServicio]
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



//--------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------Paquetes---------------------------------------------------------------------

//Horario
router.get("/paquete", async (req, res) => {
    try {
      const [result] = await Pool.query("SELECT * FROM paquete");
      console.log(result);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/paquete/:idPaquete", async (req, res) => {
    try {
      const [result] = await Pool.query(
        "SELECT * FROM paquete where idPaquete = ?",
        [req.params.idPaquete]
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
  router.post("/paquete/registro", async (req, res) => {
    try {
      const { nombre, descripcion, estado } = req.body;
      const [result] = await Pool.query(
        "INSERT INTO paquete(nombre, descripcion, estado) VALUES (?,?,?)",
        [nombre, descripcion,  estado]
      );
      res.json({
        idPaquete: result.insertId,
        nombre,
        descripcion,
        estado,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  router.put("/paquete/editar/:idPaquete", async (req, res) => {
    try {
      const { nombre, descripcion, estado} = req.body;
      const [result] = await Pool.query(
        "UPDATE paquete set nombre=?, descripcion=?, estado=? where idPaquete = ?",
        [nombre, descripcion, estado, req.params.idPaquete]
      );
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  router.delete("/paquete/eliminar/:idPaquete", async (req, res) => {
    try {
      const [result] = await Pool.query(
        "delete FROM paquete where idPaquete = ?",
        [req.params.idPaquete]
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

  //-------------------------------------------------------paquete_servicios---------------------------------------------//
  router.get("/paqueteServicio", async (req, res) => {
    try {
      const [result] = await Pool.query("SELECT paquete_servicios.idPaqueteXServicio, servicios.nombre AS idServicio, paquete.nombre AS idPaquete FROM paquete_servicios INNER JOIN paquete ON paquete_servicios.idPaquete = paquete.idPaquete INNER JOIN servicios ON paquete_servicios.idServicio = servicios.idServicio;");
      console.log(result);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  router.get("/paqueteServicio/:idPaqueteXServicio", async (req, res) => {
    try {
      const [result] = await Pool.query("SELECT * from paquete_servicios where idPaqueteXServicio = ?", [
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
  router.post("/paqueteServicio/registro", async (req, res) => {
    try {
      const {
        idPaquete,
        idServicio,
      } = req.body;
      const [result] = await Pool.query("INSERT INTO paquete_servicios(idPaquete,idServicio) VALUES (?,?)", [
        idPaquete,
        idServicio,
      ]);
      res.json({
        idPaqueteXServicio: result.insertId,
        idPaquete,
        idServicio,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }); 
  router.put("/paqueteServicio/editar/:idPaqueteXServicio", async (req, res) => {
    try {
      const {
      idPaquete,
      idServicio,
      } = req.body;
      const [result] = await Pool.query("UPDATE paquete_servicios SET idPaquete=?, idServicio=? WHERE idPaqueteXServicio = ?", [
        idPaquete,
        idServicio,
        req.params.idPaqueteXServicio,
      ]);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  router.delete("/paqueteServicio/eliminar/:idPaqueteXServicio", async (req, res) => {
    try {
      const [result] = await Pool.query(
        "DELETE FROM paquete_servicios WHERE idPaqueteXServicio = ?",
        [req.params.idPaqueteXServicio]
      );
  
      if (result.affectedRows === 0) {
        res.status(404).json({ mensaje: "tarea no encontrada" });
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });  
  
  //Horario
  router.get("/servicios", async (req, res) => {
    try {
      const [result] = await Pool.query("SELECT * FROM servicios");
      console.log(result);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  //Horario
  router.get("/paquete", async (req, res) => {
    try {
      const [result] = await Pool.query("SELECT * FROM paquete");
      console.log(result);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  //-----------------------------------------productos----------------------------------

  
//productos
router.get("/productos", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * FROM productos");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/productos/:idProducto", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "SELECT * FROM productos where idProducto = ?",
      [req.params.idProducto]
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
router.post("/productos/registro", async (req, res) => {
  try {
    const { nombre, marca, precio, unidades, estado } = req.body;
    const [result] = await Pool.query(
      "INSERT INTO productos(nombre, marca, precio, unidades, estado) VALUES (?,?,?,?,?)",
      [nombre, marca, precio, unidades, estado]
    );
    res.json({
      idProducto: result.insertId,
      nombre,
      marca,
      precio,
      unidades,
      estado,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.put("/productos/editar/:idProducto", async (req, res) => {
  try {
    const { nombre, marca, precio, unidades, estado } = req.body;
    const [result] = await Pool.query(
      "UPDATE productos set nombre=?, marca=?, precio=?, unidades=?, estado=? where idProducto = ?",
      [nombre, marca, precio, unidades, estado, req.params.idProducto]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/productos/eliminar/:idProducto", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "delete FROM productos where idProducto = ?",
      [req.params.idProducto]
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

//----------------------------------------serviciosproductos----------------------------------------
router.get("/ServiciosProductos", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT servicios_productos.idProductoXServicio, servicios.nombre AS idServicio, productos.nombre AS idProducto, servicios_productos.cantidad, servicios_productos.unidadMedida FROM servicios_productos INNER JOIN productos ON servicios_productos.idProducto = productos.idProducto INNER JOIN servicios ON servicios_productos.idServicio = servicios.idServicio;");
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/ServiciosProductos/:idProductoXServicio", async (req, res) => {
  try {
    const [result] = await Pool.query("SELECT * from servicios_productos where idProductoXServicio = ?", [
      req.params.idProductoXServicio,
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
router.post("/ServiciosProductos/registro", async (req, res) => {
  try {
    const {
      idServicio,
      idProducto,
      cantidad,
      unidadMedida,
    } = req.body;
    const [result] = await Pool.query("INSERT INTO servicios_productos(idServicio, idProducto, cantidad, unidadMedida) VALUES (?,?,?,?)", [
      idServicio,
      idProducto,
      cantidad,
      unidadMedida,
    ]);
    res.json({
      idProductoXServicio: result.insertId,
      idServicio,
      idProducto,
      cantidad,
      unidadMedida,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}); 
router.put("/ServiciosProductos/editar/:idProductoXServicio", async (req, res) => {
  try {
    const {
      idServicio,
      idProducto,
      cantidad,
      unidadMedida,
    } = req.body;
    const [result] = await Pool.query("UPDATE servicios_productos SET idServicio=?, idProducto=?, cantidad=?, unidadMedida=? WHERE idProductoXServicio = ?", [
      idServicio,
      idProducto,
      cantidad,
      unidadMedida,
      req.params.idProductoXServicio,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/ServiciosProductos/eliminar/:idProductoXServicio", async (req, res) => {
  try {
    const [result] = await Pool.query(
      "DELETE FROM servicios_productos WHERE idProductoXServicio = ?",
      [req.params.idProductoXServicio]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ mensaje: "tarea no encontrada" });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});  

export { router as serviciosRouter };
export default router;


