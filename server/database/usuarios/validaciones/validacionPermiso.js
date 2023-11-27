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
  var descripcion = document.getElementById("descripcion");
  if (descripcion.value.trim() === "") {
    mostrarAlerta("Por favor, completa la descripcion");
    return false;
  } else if (!descripcion.checkValidity()) {
    mostrarAlerta("Descripción: Por favor, ingrese solo letras.");
    return false;
  }
  var estado = document.getElementById("estado");
  var estadoSeleccionado = estado.options[estado.selectedIndex];
  if (estadoSeleccionado.value === "") {
    mostrarAlerta("Estado: Por favor, selecciona un estado válido.");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idPermiso = btnConfirmar.getAttribute("data-idpermiso");

  if (idPermiso) {
    guardarCambios(idPermiso);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo permiso");
    guardarPermiso();
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

function guardarPermiso() {
  const nombre = document.getElementById("nombre");
  const estadoSelect = document.getElementById("estado");
  const estadoSeleccionado = estadoSelect.value;
  const estado = estadoSeleccionado;
  const descripcion = document.getElementById("descripcion");

  const url = "http://localhost:4000/permisos/registrar";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      descripcion: descripcion.value,
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
      const nuevoPermiso = [];
      nuevoPermiso.push(data);
      mostrar(nuevoPermiso);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const confirmDelete = (idPermiso) => {
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
        eliminarPermiso(idPermiso).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

const eliminarPermiso = async (idPermiso) => {
  var url = `http://localhost:4000/permisos/eliminar/${idPermiso}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      await listPermisos();
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

const editarPermiso = async (idPermiso) => {
  $("#btnConfirmar").attr("data-idpermiso", idPermiso);
  $("#staticBackdrop").modal("show");
};

const guardarCambios = async (idPermisoSeleccionado) => {
  if (idPermisoSeleccionado) {
    const idPermiso = idPermisoSeleccionado;
    const nombre = $("#nombre").val();
    const estado = $("#estado").val();
    const descripcion = $("#descripcion").val();
    console.log(idPermiso)
    console.log(nombre)
    console.log(estado)
    console.log(descripcion)

    try {
      const response = await fetch(
        `http://localhost:4000/permisos/editar/${idPermiso}`,
        {
          method: "PUT",
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
