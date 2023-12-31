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

  var cedula = document.getElementById("cedula");
  if (cedula.value.trim() === "") {
    mostrarAlerta("Por favor, completa la cedula");
    return false;
  }

  var correo = document.getElementById("correo");
  if (correo.value.trim() === "") {
    mostrarAlerta("Por favor, completa el correo");
    return false;
  } else if (!validarCorreo(correo.value.trim())) {
    mostrarAlerta("Correo: Por favor, ingrese un correo electrónico válido.");
    return false;
  }

  var telefono = document.getElementById("telefono");
  if (telefono.value.trim() === "") {
    mostrarAlerta("Por favor, completa el telefono");
    return false;
  }

  var instagram = document.getElementById("instagram");
  if (instagram.value.trim() === "") {
    mostrarAlerta("Por favor, completa el instagram");
    return false;
  }

  var estado = document.getElementById("estado");
  var estadoSeleccionado = estado.options[estado.selectedIndex];
  if (estadoSeleccionado.value === "") {
    mostrarAlerta("Estado: Por favor, selecciona un estado válido.");
    return false;
  }

  var idRol = document.getElementById("idRol");
  var idRolSeleccionado = idRol.options[idRol.selectedIndex];
  if (idRolSeleccionado.value === "") {
    mostrarAlerta("Rol: Por favor, selecciona un rol válido.");
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

function validarCorreo(correo) {
  // Expresión regular para validar un correo electrónico con dominios específicos
  var regexCorreo = /^[^\s@]+@[^\s@]+\.(com|co)$/i;
  return regexCorreo.test(correo);
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

function guardarUsuario() {
  const nombre = document.getElementById("nombre");
  const cedula = document.getElementById("cedula");
  const correo = document.getElementById("correo");
  const telefono = document.getElementById("telefono");
  const instagram = document.getElementById("instagram");
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

const confirmDelete = (usuario) => {
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
        eliminarUsuario(usuario).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

const eliminarUsuario = async (idUsuario) => {
  var url = `http://localhost:4000/usuarios/eliminar/${idUsuario}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
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
    const fechaInteraccion = $("#fechaInteraccion").val();
    const idRol = $("#idRol").val();
    const estado = $("#estado").val();

    try {
      const response = await fetch(
        `http://localhost:4000/usuarios/editar/${idUsuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            cedula,
            correo,
            telefono,
            instagram,
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
