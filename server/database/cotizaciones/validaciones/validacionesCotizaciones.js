document.getElementById("btnConfirmar").addEventListener("click", async (event) => {
  event.preventDefault();

  validarFormulario()
});


const validarFormulario = async () => {
  // DESABILITAR TEMPORALMENTE LAS VALIDACIONES PREDETERMINADAS PARA DARLE PASO A LAS VALIDACIONES PERSONALIZADAS
  document.getElementById("miFormulario").setAttribute("novalidate", "true");


  //VALIDAR CAMPO ESTADO 
  var estado = document.getElementById("estado");

  if (estado.value.trim() === "") {
    await mostrarAlerta("Por favor, selecciona una opcion");
  }else if(estado.value == 2){
    await cargarModal()
  }else{
    var btnConfirmar = document.getElementById("btnConfirmar");

    //OBTIENE EL ATRIBUTO DEL BOTON QUE TIENE EL ID
    var idCotizacion = btnConfirmar.getAttribute("data-idcotizacion");
  
    //EJECUTA EL GUARDADO JUNTO CON EL ID
  
    await guardarCambios(idCotizacion);
  }

}

/*ALERTA ACTUALIZACION EXITOSA*/
const  mostrarAlertaExitosa= async(mensaje)=> {
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
        console.log("Cambios guardados correctamente"); // Agrega este log
        mostrarAlertaExitosa("Los cambios fueron guardados correctamente.");
      } else {
        console.log("Hubo un problema al guardar los cambios"); // Agrega este log
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
        await mostrarAlertaExitosa("La venta fue registrada correctamente.");
        await guardarCambios(idCotizacion);
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



/*CARGAR MODAL DE COLABORADORES */
const cargarModal = async () => {
  const colaboradores = await buscarColaborador(); 

  let content = ``;
  colaboradores.forEach((colaborador) => {
    content += `
      <select class="form-control" id="colaborador" name="colaborador">
        <option value="" disabled selected>Selecciona un estado</option>
        <option value="${colaborador.idColaborador}">${colaborador.nombre}</option>
      </select>
    `;
  });

  $("#colaboradores").html(content);

  const boton = document.getElementById("btnConfirmar");
  const miModal = new bootstrap.Modal(document.getElementById("elegirColaborador"));

  // Agregar un evento al botón para abrir el modal
  boton.addEventListener("click", () => {
    miModal.show();
  });
}
/*CARGAR MODAL DE COLABORADORES */



/*LISTENER DE VALIDAR COLABORADOR Y GUARDAR VENTA */
document.getElementById("btnConfirmarColaborador").addEventListener("click", async () => {
  //OBTIENE EL ELEMENTO POR ID
  var btnConfirmar = document.getElementById("btnConfirmarColaborador");
  // OBTIENE EL ATRIBUTO DEL BOTON, TIENE EL ID
  var idCotizacion = btnConfirmar.getAttribute("data-idcotizacion");
  // GUARDA LA VENTA
  await guardarVenta(idCotizacion);
  
  window.location.href = "../cotizaciones.html";
});
/*LISTENER DE VALIDAR COLABORADOR Y GUARDAR VENTA */



