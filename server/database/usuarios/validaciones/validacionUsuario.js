document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
  });

function validarFormulario() {
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  var idRol = document.getElementById("idRol");

  if (idRol.value.trim() === "") {
    mostrarAlerta("Por favor, selecciona una opcion");
    return false;
  } else if (estado.value.trim() === "") {
    mostrarAlerta("Por favor, selecciona una opcion");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idUsuario = btnConfirmar.getAttribute("data-idusuario");

  if (idUsuario) {
    guardarCambios(idUsuario);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo usuario");
    guardarUsuario();
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
        eliminarUsuario(idUsuario).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

function guardarUsuario() {
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const instagram = document.getElementById("instagram");
  const contrasena = document.getElementById("contrasena");
  const estadoSelect = document.getElementById("estado");
  const estadoSeleccionado = estadoSelect.value;
  const estado = estadoSeleccionado;
  const fechaInteraccion = new Date();
  const idRolSelect = document.getElementById("idRol");
  const idRolSeleccionado = idRolSelect.value;
  const idRol = idRolSeleccionado;

  const url = "http://localhost:4000/usuarios/registrar";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      cedula: cedula.value,
      correo: correo.value,
      telefono: telefono.value,
      instagram: instagram.value,
      contrasena: contrasena.value,
      fechaInteraccion: fechaInteraccion,
      estado: estado,
      idRol: idRol,
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

const eliminarUsuario = async (idUsuario) => {
  var url = `http://localhost:4000/usuarios/eliminar/${idUsuario}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      //Refresca la pagina
      await listUsuarios();
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

function editarUsuario(usuario) {
  const idUsuario = usuario.idUsuario;
  const nombre = usuario.nombre;
  const cedula = usuario.cedula;
  const correo = usuario.correo;
  const telefono = usuario.telefono;
  const instagram = usuario.instagram;
  const contrasena = usuario.contrasena;
  const estadoSelect = document.getElementById("estado");
  const estadoSeleccionado = estadoSelect.value;
  const estado = estadoSeleccionado;
  const idRolSelect = document.getElementById("idRol");
  const idRolSeleccionado = idRolSelect.value;
  const idRol = idRolSeleccionado;

  $("#nombre").val(nombre);
  $("#cedula").val(cedula);
  $("#correo").val(correo);
  $("#telefono").val(telefono);
  $("#instagram").val(instagram);
  $("#contrasena").val(contrasena);
  $("#estado").val(estado);
  $("#idRol").val(idRol);

  $("#btnConfirmar").attr("data-idusuario", idUsuario);

  openCreateModal();
}

const guardarCambios = async (idUsuarioSeleccionado) => {
  if (idUsuarioSeleccionado) {
    const idUsuario = idUsuarioSeleccionado;
    const nombre = $("#nombre").val();
    const cedula = $("#cedula").val();
    const correo = $("#correo").val();
    const telefono = $("#telefono").val();
    const instagram = $("#instagram").val();
    const contrasena = $("#contrasena").val();
    const fechaInteraccion = $("#fechaInteraccion").val();
    const idRol = $("#idRol").val();
    const estado = $("#estado").val();

    try {
      const response = await fetch(
        `http://localhost:4000/usuarios/editar/${idUsuario}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            cedula,
            correo,
            telefono,
            instagram,
            contrasena,
            fechaInteraccion,
            idRol,
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
