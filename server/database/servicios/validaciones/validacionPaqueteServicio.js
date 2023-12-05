document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    validarFormulario();
  });

function validarFormulario() {
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  var idPaquete = document.getElementById("idPaquete");
  var idPaqueteSeleccionado = idPaquete.options[idPaquete.selectedIndex];
  if (idPaqueteSeleccionado.value === "") {
    mostrarAlerta("Estado: Por favor, selecciona un estado válido.");
    return false;
  }

  var idServicio = document.getElementById("idServicio");
  var idServicioSeleccionado = idServicio.options[idServicio.selectedIndex];
  if (idServicioSeleccionado.value === "") {
    mostrarAlerta("Rol: Por favor, selecciona un rol válido.");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idPaqueteXServicio = btnConfirmar.getAttribute("data-idpaquetexservicio");

  if (idPaqueteXServicio) {
    guardarCambios(idPaqueteXServicio);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo paqueteXservicio");
    guardarPaqueteXServicio();
  }
}

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

function mostrarAlerta(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
}

function guardarPaqueteXServicio() {

  const idPaqueteSelect = document.getElementById("idPaquete");
  const idPaqueteSeleccionado = idPaqueteSelect.value;
  const idPaquete = idPaqueteSeleccionado;

  const idServicioSelect = document.getElementById("idServicio");
  const idServicioSeleccionado = idServicioSelect.value;
  const idServicio = idServicioSeleccionado;

  const url = "http://localhost:4000/paqueteServicio/registro";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idPaquete: idPaquete,
      idServicio: idServicio,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
      return response.json();
    })
    .then((data) => {
      const nuevoPaqueServi = [];
      nuevoPaqueServi.push(data);
      mostrar(nuevoPaqueServi);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const confirmDelete = (idPaqueteXServicio) => {
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
        eliminarpaqueteServicio(idPaqueteXServicio).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

const eliminarpaqueteServicio = async (idPaqueteXServicio) => {
  console.log(idPaqueteXServicio)
  var url = `http://localhost:4000/paqueteServicio/eliminar/${idPaqueteXServicio}`;
  console.log(url)

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      await listUsers();
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
};

function editarPaqueteXServicio(idPaqueteXServicio) {
  const idPaqueteSelect = document.getElementById("idPaquete");
  const idPaqueteSeleccionado = idPaqueteSelect.value;
  const idPaquete = idPaqueteSeleccionado;

  const idServicioSelect = document.getElementById("idServicio");
  const idServicioSeleccionado = idServicioSelect.value;
  const idServicio = idServicioSeleccionado;


  $("#idPaquete").val(idPaquete);
  $("#idServicio").val(idServicio);

  $("#btnConfirmar").attr("data-idpaquetexservicio", idPaqueteXServicio);

  openCreateModal();
}

const guardarCambios = async (idPaqueteXServicioSeleccionado) => {
  if (idPaqueteXServicioSeleccionado) {
    const idPaqueteXServicio = idPaqueteXServicioSeleccionado;

    const idPaquete = $("#idPaquete").val();
    const idServicio = $("#idServicio").val();

    try {
      const response = await fetch(
        `http://localhost:4000/paqueteServicio/editar/${idPaqueteXServicioSeleccionado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPaquete,
            idServicio,
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
