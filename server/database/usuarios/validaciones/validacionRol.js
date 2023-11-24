document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
  });

function validarFormulario() {
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  var nombre = document.getElementById("nombre");
  if (nombre.value.trim() === "") {
    mostrarAlerta("Por favor, completa el nombre");
    return false;
  } else if (!nombre.checkValidity()) {
    mostrarAlerta("Nombre: Por favor, ingrese solo letras.");
    return false;
  }
  var estado = document.getElementById("estado");
  var estadoSeleccionado = estado.options[estado.selectedIndex];
  if (estadoSeleccionado.value === "") {
    mostrarAlerta("Estado: Por favor, selecciona un estado válido.");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idRol = btnConfirmar.getAttribute("data-idrol");

  if (idRol) {
    guardarCambios(idRol);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo rol");
    guardarRol();
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

function guardarRol() {
  const nombre = document.getElementById("nombre");
  const estadoSelect = document.getElementById("estado");
  const estadoSeleccionado = estadoSelect.value;
  const estado = estadoSeleccionado;

  const url = "http://localhost:4000/roles/registrar";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
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
      const nuevoUsuario = [];
      nuevoUsuario.push(data);
      mostrar(nuevoUsuario);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const confirmDelete = (idRol) => {
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
        eliminarRol(idRol).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

const eliminarRol = async (idRol) => {
  var url = `http:localhost:4000/roles/${idRol}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      await listRoles();
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

const editarRol = (rol) => {
  $("#btnConfirmar").attr("data-idrol", rol.idRol);
  openCreateModal();
};

const guardarCambios = async (idRolSeleccionado) => {
  if (idRolSeleccionado) {
    const idRol = idRolSeleccionado;
    const nombre = $("#nombre").val();
    const estado = $("#estado").val();

    try {
      const response = await fetch(
        `http:localhost:4000/roles/editar/${idRol}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
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
