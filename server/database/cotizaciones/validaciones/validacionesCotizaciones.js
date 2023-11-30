document.getElementById("btnConfirmar").addEventListener("click", async (event) => {
  event.preventDefault();

  validarFormulario()
});

/*LISTENER DE VALIDAR COLABORADOR Y GUARDAR VENTA */

document.getElementById("btnConfirmarColaborador").addEventListener("click", async (e) => {
  e.preventDefault()
  validarColaborador()

});
/*LISTENER DE VALIDAR COLABORADOR Y GUARDAR VENTA */

const validarFormulario = async () => {
  // DESABILITAR TEMPORALMENTE LAS VALIDACIONES PREDETERMINADAS PARA DARLE PASO A LAS VALIDACIONES PERSONALIZADAS
  document.getElementById("miFormulario").setAttribute("novalidate", "true");


  //VALIDAR CAMPO ESTADO 
  var estado = document.getElementById("estado");

  if (estado.value.trim() === "") {
    await mostrarAlerta("Por favor, selecciona una opcion");
  } else if (estado.value == 2) {
    await cargarModal()
  } else {
    var btnConfirmar = document.getElementById("btnConfirmar");

    //OBTIENE EL ATRIBUTO DEL BOTON QUE TIENE EL ID
    var idCotizacion = btnConfirmar.getAttribute("data-idcotizacion");

    //EJECUTA EL GUARDADO JUNTO CON EL ID

    await guardarCambios(idCotizacion);
  }

}

/*ALERTA ACTUALIZACION EXITOSA*/
const mostrarAlertaExitosa = async (mensaje) => {
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
      timer: 1500,
    }).then(async () => {
      await listCotizaciones();
    });
  }, 1500);
}
/*ALERTA ACTUALIZACION EXITOSA*/



/*ALERTA DE ERROR GENERICA */
const mostrarAlerta = async (mensaje) => {
  await Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
}
/*ALERTA DE ERROR GENERICA */



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



/*ALERTA CONFIRMAR ELIMINAR*/
const confirmDelete = async (idCotizacion) => {
  await Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await eliminarCotizacion(idCotizacion);
      await Swal.fire({
        title: "Borrado",
        text: "El registro ha sido eliminado.",
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "Confirmar",
      });
    }
  });
};
/*ALERTA CONFIRMAR ELIMINAR*/


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
        console.log("Cambios guardados correctamente");
        mostrarAlertaExitosa("Los cambios fueron guardados correctamente.");
        miModal.hide();
      } else {
        console.log("Hubo un problema al guardar los cambios");
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



/*FUNCION ABRIR MODAL Y AGREGAR ATRIBUTO AL BOTON*/
const editarCotizacion = (cotizacion) => {
  $("#btnConfirmar").attr("data-idcotizacion", cotizacion.idCotizacion);
  $("#btnConfirmarColaborador").attr("data-idcotizacion", cotizacion.idCotizacion);

};
/*FUNCION ABRIR MODAL Y AGREGAR ATRIBUTO AL BOTON*/



/*BUSCAR COLABORADORES */
const buscarColaborador = async (req, res) => {
  var url = `http://localhost:4000/ventas/c`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json(); // Espera a que la promesa se resuelva
      console.log(data);
      return data;
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al buscar los colaboradores.",
      });
    }
  } catch (error) {
    console.error("Error en la solicitud GET", error);
  }
};
/*BUSCAR COLABORADORES */



/*GUARDAR VENTA*/
const guardarVenta = async (idCotizacion) => {
  if (idCotizacion) {
    const idColaborador = $("#colaborador").val();

    try {
      const response = await fetch(
        `http://localhost:4000/ventas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idColaborador,
            idCotizacion
          }),
        }
      );

      if (response.ok) {
        console.log("Venta guardada correctamente");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar la venta.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud POST", error);
    }
  }
};
/*GUARDAR VENTA*/



/*VALIDAR COLABORADORES */
const validarColaborador = async () => {
  document.getElementById("elegirColaborador").setAttribute("novalidate", "true");
  const idColaborador = document.getElementById("colaborador");
  console.log(idColaborador)
  if (idColaborador.value.trim() === "") {
    await mostrarAlerta("Por favor, selecciona una opcion");
  } else {
    //OBTIENE EL ELEMENTO POR ID
    var btnConfirmar = document.getElementById("btnConfirmarColaborador");
    // OBTIENE EL ATRIBUTO DEL BOTON, TIENE EL ID
    var idCotizacion = btnConfirmar.getAttribute("data-idcotizacion");
    // VALIDAR CAMPO Y GUARDAR VENTA

    await guardarVenta(idCotizacion);
    await guardarCambios(idCotizacion)
  }
}
/*VALIDAR COLABORADORES */



/*CARGAR MODAL DE COLABORADORES */
const miModal = new bootstrap.Modal(document.getElementById("elegirColaborador"));
const cargarModal = async () => {
  const colaboradores = await buscarColaborador();




  let content = ``;

  content += `<option value="" disabled selected>Selecciona un colaborador</option>`;

  colaboradores.forEach((colaborador) => {
    content += `<option value="${colaborador.idColaborador}">${colaborador.nombre}</option>`;
  });

  await $("#colaborador").html(content);

  const boton = document.getElementById("btnConfirmar");

  // Agregar un evento al botón para abrir el modal
  boton.addEventListener("click", async () => {
    await miModal.show();
  });
}
/*CARGAR MODAL DE COLABORADORES */






