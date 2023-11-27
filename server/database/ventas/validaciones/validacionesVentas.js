/*FUNCION ABRIR MODAL*/
const verVenta = async (venta) =>{
  
  try {
    const response = await fetch(
      `http://localhost:4000/cotizaciones/${venta.idCotizacion}`,
      {
        method: "GET", 
      }
    );
    const data = await response.json()

      document.getElementById("idCotizacion").innerHTML = data[0].idCotizacion
      document.getElementById("nombreCliente").innerHTML = data[0].nombreCliente
      document.getElementById("cotizacion_fechaCreacion").innerHTML = data[0].cotizacion_fechaCreacion
      document.getElementById("cotizacion_fechaFinalizacion").innerHTML = data[0].cotizacion_fechaFinalizacion
      document.getElementById("estado").innerHTML = data[0].estado
      document.getElementById("productos").innerHTML = data[0].productos
      document.getElementById("total").innerHTML = data[0].total

  } catch (error) {
    console.error("Error al mostrar datos", error);
  }


};
/*FUNCION ABRIR MODAL*/

