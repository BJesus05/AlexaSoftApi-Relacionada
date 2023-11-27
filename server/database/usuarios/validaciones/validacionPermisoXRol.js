document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
  });

function validarFormulario() {
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  var idRol = document.getElementById("idRol");
  var idRolSeleccionado = idRol.options[idRol.selectedIndex];
  if (idRolSeleccionado.value === "") {
    mostrarAlerta("Rol: Por favor, selecciona un rol válido.");
    return false;
  }
  var idPermiso = document.getElementById("idPermiso");
  var idPermisoSeleccionado = idPermiso.options[idPermiso.selectedIndex];
  if (idPermisoSeleccionado.value === "") {
    mostrarAlerta("Permiso: Por favor, selecciona un permiso válido.");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idPermisoXRol = btnConfirmar.getAttribute("data-idpermisoxrol");

  if (idPermisoXRol) {
    guardarCambios(idPermisoXRol);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo registro");
    guardarPermisoXRol();
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

function guardarPermisoXRol() {
  const idRolSelect = document.getElementById("idRol");
  const idRolSeleccionado = idRolSelect.value;
  const idRol = idRolSeleccionado;
  const idPermisoSelect = document.getElementById("idPermiso");
  const idPermisoSeleccionado = idPermisoSelect.value;
  const idPermiso = idPermisoSeleccionado;

  const url = "http://localhost:4000/permisosxrol/registrar";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idRol: idRol,
      idPermiso: idPermiso,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
      return response.json();
    })
    .then((data) => {
      const nuevoPermisoXRol = [];
      nuevoPermisoXRol.push(data);
      mostrar(nuevoPermisoXRol);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const confirmDelete = (idPermisoXRol) => {
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
        eliminarPermisoXRol(idPermisoXRol).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

const eliminarPermisoXRol = async (idPermisoXRol) => {
  var url = `http://localhost:4000/permisosxrol/eliminar/${idPermisoXRol}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      await listPermisosXRol();
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

const editarPermisoXRol = async (idPermisoXRol) => {
  $("#btnConfirmar").attr("data-idpermisoxrol", idPermisoXRol);
  $("#staticBackdrop").modal("show");
};

const guardarCambios = async (idPermisoXRolSeleccionado) => {
  if (idPermisoXRolSeleccionado) {
    const idPermisoXRol = idPermisoXRolSeleccionado;
    const idRol = $("#idRol").val();
    const idPermiso = $("#idPermiso").val();
    console.log(idPermisoXRol)
    console.log(idRol)
    console.log(idPermiso)

    try {
      const response = await fetch(
        `http://localhost:4000/permisosxrol/editar/${idPermisoXRol}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idRol,
            idPermiso,
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
