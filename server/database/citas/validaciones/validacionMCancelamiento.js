document.getElementById("miFormulario").addEventListener("submit", function (event) {
  event.preventDefault();
  validarFormulario();
});

function validarFormulario() {
  // Deshabilitar temporalmente las validaciones predeterminadas
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  // Validar Campo 1
  var motivo = document.getElementById("motivoRegistro");
  if (motivo.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo motivo");
    return false;
  } else if (!/^[a-zA-Z\s]+$/.test(motivo.value.trim())) {
    mostrarAlerta("Motivo: Por favor, ingrese solo letras ");
    return false;
  }

  var btnConfirmar = document.getElementById("btnConfirmar");
  var idMotivo = btnConfirmar.getAttribute("data-idhmotivo");

  if (idMotivo) {
      editarMotivo(idMotivo);
  } else {
      mostrarAlertaExitosa("Validación exitosa. Creando nuevo motivo...");
      guardarMotivo();
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
          popup: 'custom-alert-class'
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
          timer: 2000,
      }).then(() => {
          document.getElementById("miFormulario").submit();
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

const confirmDelete = (idMotivo) => {
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
              text: "El registro ha sido eliminado (simulación).",
              icon: "success",
              confirmButtonColor: "#198754",
              confirmButtonText: "Confirmar",
          }).then(() => {
              eliminarMotivo(idMotivo).then((eliminado) => {
                  if (eliminado) {
                      location.reload();
                  }
              });
          });
      }
  });
};

function guardarMotivo() {
  const motivo = document.getElementById("motivoRegistro");

  const urlM = "http://localhost:4000/motivoscancelacion/registro/";

  fetch(urlM, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          motivo: motivo.value,
      }),
  })
      .then((response) => response.json())
      .then((data) => {
          const nuevoMotivo = [];
          nuevoMotivo.push(data);
          mostrarm(nuevoMotivo);
      })
      .then(() => location.reload())
      .catch((error) => {
          console.error(error.message);
      });
}

function eliminarMotivo(idMotivo) {
  var url = `http://localhost:4000/motivoscancelacion/eliminar/${idMotivo}`;

  return fetch(url, {
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

const editarMotivo = async(idMotivo) => {
  const motivo = users.find((user) => user.idMotivo === idMotivo);

  $("#motivoRegistro").val(motivo.motivo);
  $("#btnConfirmar").attr("data-idhmotivo", idMotivo);

  $("#staticBackdrop").modal("show");

  // Agregar un event listener al botón confirmar
  $("#btnConfirmar").on("click", function() {
    guardarCambios(idMotivo);
  });
};


const guardarCambios = async (motivoIdSeleccionado) => {
  if (motivoIdSeleccionado) {
    const idMotivo = motivoIdSeleccionado;
    const motivo = $("#motivoRegistro").val();

    try {
      const response = await fetch(
        `http://localhost:4000/motivoscancelacion/editar/${idMotivo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            motivo,
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
      motivoIdSeleccionado = null;
    }
  }
};
