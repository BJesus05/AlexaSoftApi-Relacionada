document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
  });

async function validarFormulario() {
  // Deshabilitar temporalmente las validaciones predeterminadas
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  // Validar Campo 1
  var idRolSelect = document.getElementById("idRol");
  var selectedOption = idRolSelect.options[idRolSelect.selectedIndex];
  if (selectedOption.value === "") {
    // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
    mostrarAlerta("Por favor, selecciona un estado válido.");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idUsuario = btnConfirmar.getAttribute("data-idusuario");

  try {
    await guardarCambios(idUsuario);
    mostrarAlertaExitosa("Los cambios fueron guardados correctamente.");
  } catch (error) {
    console.error("Error al guardar cambios:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al guardar los cambios.",
    });
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
    location.reload();
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
  }, 1000);
}

function mostrarAlerta(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
}

const confirmDelete = (idUsuario) => {
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
        eliminarHorario(idUsuario).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

/*function guardarHorario() {
  
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
}*/

function eliminarHorario(idUsuario) {
  var url = `http://localhost:4000/horario/eliminar/`;

  return fetch(url + idUsuario, {
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

const editarUsuario = (usuario) => {
  $("#idRol").val(usuario.idRol);
  $("#btnConfirmar").attr("data-idusuario", usuario.idUsuario);
  $("#staticBackdrop").modal("show");
};

const guardarCambios = async (idUsuarioSeleccionado) => {
  if (idUsuarioSeleccionado) {
    const idRol = $("#idRol").val();
    console.log("Valor de idRol enviado: " + idRol);
    console.log("Valor de idUsuarioSeleccionado: " + idUsuarioSeleccionado);

    const response = await fetch(
      `http://localhost:4000/usuarios/${idUsuarioSeleccionado}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idRol,
        }),
      }
    );

    const result = await response.json();
    console.log("Respuesta del servidor:", result);

    if (!response.ok) {
      throw new Error("Hubo un problema al guardar los cambios.");
    }
  }
};