document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
  });

function validarFormulario() {
  // Deshabilitar temporalmente las validaciones predeterminadas
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  // Validar Campo 1
  var numeroDia = document.getElementById("numeroDia");
  if (numeroDia.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 1");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!numeroDia.checkValidity()) {
    mostrarAlerta("Campo 1: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 2
  var inicioJornada = document.getElementById("inicioJornada");
  if (inicioJornada.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese la hora de Incio");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } 

  // Validar Campo 3
  var finJornada = document.getElementById("finJornada");
  if (finJornada.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese la hora de fin");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } 

  // Validar Campo 4
  var estado = document.getElementById("estado");
  if (estado.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese un estado");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!estado.checkValidity()) {
    mostrarAlerta("Campo 4: Por favor, ingrese solo letras.");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idHorario = btnConfirmar.getAttribute("data-idhorario");

  if (idHorario) {
    guardarCambios(idHorario);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo horario...");
    guardarHorario();
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
      document.getElementById("miFormulario").reset();
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

const confirmDelete = (idHorario) => {
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
        eliminarHorario(idHorario).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

function guardarHorario() {
  const numeroDia = document.getElementById("numeroDia");
  const inicioJornada = document.getElementById("inicioJornada");
  const finJornada = document.getElementById("finJornada");
  const estadoSelect = document.getElementById("estado");
  const estadoSeleccionado = estadoSelect.value;
  const estado = estadoSeleccionado;

  const url = "http://localhost:4000/horario/registro";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numeroDia: numeroDia.value,
      inicioJornada: inicioJornada.value,
      finJornada: finJornada.value,
      estado: estado,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
      return response.json();
    })
    .then((data) => {
      const nuevaHorario = [];
      nuevaHorario.push(data);
      mostrar(nuevaHorario);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function eliminarHorario(idHorario) {
  var url = `http://localhost:4000/horario/eliminar/`;

  return fetch(url + idHorario, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Registro borrado exitosamente");
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error al enviar solicitud de borrado:", error);
      return false;
    });
}

const editarHorario = (idHorario) => {
  const horario = users.find((user) => user.idHorario === idHorario);

  $("#numeroDia").val(horario.numeroDia);
  $("#inicioJornada").val(horario.inicioJornada);
  $("#finJornada").val(horario.finJornada);
  $("#estado").val(horario.estado);
  $("#btnConfirmar").attr("data-idhorario", idHorario);

  $("#staticBackdrop").modal("show");
};

const guardarCambios = async (horarioIdSeleccionado) => {
  if (horarioIdSeleccionado) {
    const idHorario = horarioIdSeleccionado;
    const numeroDia = $("#numeroDia").val();
    const inicioJornada = $("#inicioJornada").val();
    const finJornada = $("#finJornada").val();
    const estado = $("#estado").val();

    try {
      const response = await fetch(
        `http://localhost:4000/horario/${idHorario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numeroDia,
            inicioJornada,
            finJornada,
            estado,
          }),
        }
      );

      if (response.ok) {
        // La solicitud PUT fue exitosa
        mostrarAlertaExitosa("Los cambios fueron guardados correctamente.");
      } else {
        // La solicitud PUT no fue exitosa
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al guardar los cambios.",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud PUT", error);
    } finally {
      horarioIdSeleccionado = null;
    }
  }
};
