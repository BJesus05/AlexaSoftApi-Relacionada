//CADA VEZ QUE SE SUBA EL FORMULARIO SE VA A ACTIVAR
document.getElementById("miFormulario").addEventListener("submit", function (event) {
    event.preventDefault();
    //FUNCION VALIDAR REGISTRO (PARA QUE LOS CAMPOS NO SE VAYAN VACIOS)
    validarFormulario();
  });

function validarFormulario() {
  // DESABILITAR TEMPORALMENTE LAS VALIDACIONES PREDETERMINADAS PARA DARLE PASO A LAS VALIDACIONES PERSONALIZADAS
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  
  var estado = document.getElementById("estado");
  
  if (estado.value.trim() === "") {
    mostrarAlerta("Por favor, selecciona una opcion");
    return false; 
  } 

  //SI EL CAMPO ESTA VACIO NO EJECUTARA EL GUARDADO DE LA ACTUALIZACION

  //OBTIENE EL ELEMENTO BOTON
  var btnConfirmar = document.getElementById("btnConfirmar");

  //OBTIENE EL ATRIBUTO DEL BOTON QUE TIENE EL ID
  var idCotizacion = btnConfirmar.getAttribute("data-idcotizacion");

 //EJECUTA EL GUARDADO JUNTO CON EL ID
  guardarCambios(idCotizacion);

}



/*ALERTA DE ERROR GENERICA */
function mostrarAlerta(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
}
/*ALERTA DE ERROR GENERICA */



/*FUNCION ABRIR MODAL*/
window.verVenta = async function(idCotizacion) {
  
  try {
    const response = await fetch(
      `http://localhost:4000/cotizaciones/${idCotizacion}`,
      {
        method: "GET", 
      }
    );
    console.log(response.json())
    const data = JSON.stringify(response)

    $("#idCotizacion").val(data.idCotizacion);
    $("#nombreCliente").val(data.nombreCliente);
    $("#cotizacion_fechaCreacion").val(data.cotizacion_fechaCreacion);
    $("#cotizacion_fechaFinalizacion").val(data.cotizacion_fechaFinalizacion);
    $("#estado").val(data.estado);
    $("#productos").val(data.productos);
    $("#total").val(data.total);

  } catch (error) {
    console.error("Error al mostrar datos", error);
  }

  //ABRE EL MODAL (.SHOW)
  openCreateModal()
};
/*FUNCION ABRIR MODAL*/


/*FUNCION FETCH GUARDAR EN LA BASE DE DATOS*/
const guardarCambios = async (idCotizacionSeleccionado) => {
  if (idCotizacionSeleccionado) {
    const estado = $("#estado").val();

    try {
      const response = await fetch(
        `http://localhost:4000/cotizaciones/${idCotizacionSeleccionado}`,
        {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            estado,
          }),
        }
      );

      if (response.ok) {
        
        mostrarAlertaExitosa("Los cambios fueron guardados correctamente.");
      } else {
        
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los cambios.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud PATCH", error);
    }
  }
};
/*FUNCION FETCH GUARDAR EN LA BASE DE DATOS*/
