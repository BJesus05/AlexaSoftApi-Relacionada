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
  var nombre = document.getElementById("nombre");
  if (nombre.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 1");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!nombre.checkValidity()) {
    mostrarAlerta("Campo 1: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 2
  var descripcion = document.getElementById("descripcion");
  if (descripcion.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese la hora de Incio");
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
  var idPaquete = btnConfirmar.getAttribute("data-idpaquete");

  if (idPaquete) {
    guardarCambios(idPaquete);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo paquete...");
    guardarpaquete();
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

const confirmDelete = (idPaquete) => {
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
        eliminarPaquete(idPaquete).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

function guardarpaquete() {
  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const estadoSelect = document.getElementById("estado");
  const estadoSeleccionado = estadoSelect.value;
  const estado = estadoSeleccionado;


  const url = "http://localhost:4000/paquete/registro";

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
      const nuevaPaquete = [];
      nuevaPaquete.push(data);
      mostrar(nuevaPaquete);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function eliminarPaquete(idPaquete) {
  var url = `http://localhost:4000/paquete/eliminar/`;

  return fetch(url + idPaquete, {
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

const editarPaquete = (idPaquete) => {
  const paquete = users.find((user) => user.idPaquete === idPaquete);

  $("#nombre").val(paquete.nombre);
  $("#descripcion").val(paquete.descripcion);
  $("#estado").val(paquete.estado);
  $("#btnConfirmar").attr("data-idpaquete", idPaquete);
  $("#staticBackdrop").modal("show");
};

const guardarCambios = async (paqueteidSeleccionado) => {
  if (paqueteidSeleccionado) {
    const idPaquete = paqueteidSeleccionado;
    console.log(idPaquete)
    const nombre = $("#nombre").val();
    const descripcion = $("#descripcion").val();
    const estado = $("#estado").val();


    try {
      const response = await fetch(
        `http://localhost:4000/paquete/editar/${idPaquete}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            descripcion,
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
      paqueteidSeleccionado = null;
    }
  }
};
