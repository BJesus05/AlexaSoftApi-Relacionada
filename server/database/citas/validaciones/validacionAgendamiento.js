document.getElementById("miFormulario").addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulario();
  });

function validarFormulario() {
  // Deshabilitar temporalmente las validaciones predeterminadas
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  // Validar Campo 1
  var fecha = document.getElementById("fechaCita");


  // Validar Campo 2
  var hora = document.getElementById("horaCita");
 
  // Validar Campo 3
  var campo3 = document.getElementById("detalleCita");
  if (campo3.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 3");
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!campo3.checkValidity()) {
    mostrarAlerta("Campo 3: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 4
  var campo4 = document.getElementById("estadoCita");


  // Validar Campo 5 
  var estadoSelect = document.getElementById("motivoCancelacion");
  
    // Validar Campo 6
  var campo4 = document.getElementById("usuarioCita");

    // Validar Campo 7
  var campo4 = document.getElementById("paqueteCita");


    // Validar Campo 8
  var campo4 = document.getElementById("horarioCita");

 

  // Si todos los campos son válidos, mostrar la alerta exitosa y enviar el formulario
  var btnConfirmar = document.getElementById("btnConfirmar");
  var idCita = btnConfirmar.getAttribute("data-idcitas");

  if (idCita) {
    editaCitas(idCita);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo motivo...");
  }
}



function mostrarAlertaExitosa(mensaje) {
    Swal.fire({
        imageUrl: "../../images/logoAlexa.jpg",
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
        guardarCitas();
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

const confirmDelete = (idCita) => {
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
              eliminarCitas(idCita).then((eliminado) => {
                  if (eliminado) {
                      location.reload();
                  }
              });
          });
      }
  });
};

function guardarCitas() {
  var fecha = document.getElementById("fechaCita");
  var hora = document.getElementById("horaCita");
  var detalles = document.getElementById("detalleCita");
  var estado = document.getElementById("estadoCita").value;
  var motivoCancelacion = document.getElementById("motivoCancelacion").value;
  var idUsuario = document.getElementById("usuarioCita").value;
  var idPaquete = document.getElementById("paqueteCita").value;
  var idHorario = document.getElementById("horarioCita").value;

  const url = "http://localhost:4000/citas/registro/";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fecha: fecha.value,
      hora: hora.value,
      detalles: detalles.value,
      estado: estado,
      motivoCancelacion: motivoCancelacion,
      idUsuario: idUsuario,
      idPaquete: idPaquete,
      idHorario: idHorario,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const nuevoCitas = [];
      nuevoCitas.push(data);
      mostrarm(nuevoCitas);
    })
    .then(() => location.reload())
    .catch((error) => {
      console.error(error.message);
    });
}

function eliminarCitas(idCita) {
  var url = `http://localhost:4000/citas/eliminar/${idCita}`;

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


const editaCitas = async (idCita) => {
  console.log("Entrando en editaCitas");
  const citas = users.find((citas) => citas.idCita === idCita);
  if (citas) {
    // Resto del código
    console.log(idCita)
  $("#fechaRegistro").val(citas.fecha);
  $("#horaRegistro").val(citas.hora);
  $("#detallesRegistro").val(citas.detalles);
  $("#estadoRegistro").val(citas.estado);
  $("#motivoCancelacionRegistro").val(citas.motivoCancelacion);
  $("#idUsuarioRegistro").val(citas.idUsuario);
  $("#idPaqueteRegistro").val(citas.idPaquete);
  $("#idHorarioRegistro").val(citas.idHorario);

  $("#btnConfirmar").attr("data-idcitas", idCita);

  $("#staticBackdrop").modal("show");

  // Agregar un event listener al botón confirmar
  $("#btnConfirmar").on("click", function () {
    guardarCambios(idCita);
  });
  } else {
    console.error("La cita no fue encontrada");
  }
  
};


const guardarCambios = async (motivoIdSeleccionado) => {
  if (motivoIdSeleccionado) {
    const idCita = motivoIdSeleccionado;
    const fecha = $("#fechaRegistro").val();
    const hora = $("#horaRegistro").val();
    const detalles = $("#detallesRegistro").val();
    const estado = $("#estadoRegistro").val();
    const motivoCancelacion = $("#motivoCancelacionRegistro").val();
    const idUsuario = $("#idUsuarioRegistro").val();
    const idPaquete = $("#idPaqueteRegistro").val();
    const idHoario = $("#idHorarioRegistro").val();


    try {
      const response = await fetch(
        `http://localhost:4000/citas/editar/${idCita}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fecha,
            hora,
            detalles,
            estado,
            motivoCancelacion,
            idUsuario,
            idPaquete,
            idHoario,
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
