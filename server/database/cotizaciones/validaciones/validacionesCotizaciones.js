//CADA VEZ QUE SE SUBA EL FORMULARIO SE VA A ACTIVAR
document.getElementById("miFormulario").addEventListener("submit", function (event) {
    event.preventDefault();
    //FUNCION VALIDAR REGISTRO (PARA QUE LOS CAMPOS NO SE VAYAN VACIOS)
    validarFormulario();
  });

function validarFormulario() {
  // DESABILITAR TEMPORALMENTE LAS VALIDACIONES PREDETERMINADAS PARA DARLE PASO A LAS VALIDACIONES PERSONALIZADAS
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  
  //VALIDAR CAMPO ESTADO (EL UNICO QUE HAY JAJAJAJAJ)
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

/*ALERTA ACTUALIZACION EXITOSA*/
function mostrarAlertaExitosa(mensaje) {
  Swal.fire({
    imageUrl: "../../../images/logoAlexa.jpg",
    imageWidth: 200,
    imageHeight: 100,
    imageAlt: "Alexa Soft",
    title: "Cargando...",
    showConfirmButton: false,
    allowOutsideClick: false,
    willOpen: function () {
      Swal.showLoading();
    },
    customClass: {
      popup: "custom-alert-class",
    },
  });
  setTimeout(() => {
    //OCULTA LA VENTANA MODAL
    $("#staticBackdrop").modal("hide");
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: mensaje,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 3000,
    }).then(() => {
      location.reload();
    });
  }, 3000);
}
/*ALERTA ACTUALIZACION EXITOSA*/



/*ALERTA DE ERROR GENERICA */
function mostrarAlerta(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
}
/*ALERTA DE ERROR GENERICA */



/*ALERTA CONFIRMAR ELIMINACION */
const confirmDelete = (idCotizacion) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Borrado",
        text: "El registro ha sido eliminado.",
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "Confirmar",
      }).then(() => {
        eliminarCotizacion(idCotizacion).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};
/*ALERTA CONFIRMAR ELIMINACION */



/*FUNCION ELIMINAR COTIZACION*/
const eliminarCotizacion = async (idCotizacion) => {
  var url = `http://localhost:4000/cotizaciones/${idCotizacion}`;

  try {
    const response = await fetch(
      url,
      {
        method: "DELETE",      
      }
    );

    if (response.ok) {
      //Refresca la pagina
      await listCotizaciones();

    } else {
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al borrar los datos.",
      });
    }
  } catch (error) {
    console.error("Error en la solicitud DELETE", error);
  }
}
/*FUNCION ELIMINAR COTIZACION*/


/*FUNCION ABRIR MODAL Y AGREGAR ATRIBUTO AL BOTON*/
const editarCotizacion = (cotizacion) => {
  $("#btnConfirmar").attr("data-idcotizacion", cotizacion.idCotizacion);

  openCreateModal()
};
/*FUNCION ABRIR MODAL Y AGREGAR ATRIBUTO AL BOTON*/


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
