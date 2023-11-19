document.getElementById("miFormulario").addEventListener("submit", function (event) {
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
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!numeroDia.checkValidity()) {
    mostrarAlerta("Campo 1: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 2
  var inicioJornada = document.getElementById("inicioJornada");
  if (inicioJornada.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 2");
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!inicioJornada.checkValidity()) {
    mostrarAlerta("Campo 2: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 3
  var finJornada = document.getElementById("finJornada");
  if (finJornada.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 3");
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!finJornada.checkValidity()) {
    mostrarAlerta("Campo 3: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 4
  var estado = document.getElementById("estado");
  if (estado.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 4");
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!estado.checkValidity()) {
    mostrarAlerta("Campo 4: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 5 (estadoSelect)
 

  // Si todos los campos son válidos, mostrar la alerta exitosa y enviar el formulario
  mostrarAlertaExitosa("Validación exitosa. Todos los campos fueron registrados correctamente.");
  guardarHorario();
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
        text: "El registro ha sido eliminado (simulación).",
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "Confirmar",
        
      });
      eliminarHorario(idHorario);
    }
  });
};

function guardarHorario() {
  const numeroDia = document.getElementById('numeroDia');
  const inicioJornada = document.getElementById('inicioJornada');
  const finJornada = document.getElementById('finJornada');
  const estado = document.getElementById('estado');

  const url = "http://localhost:4000/horario/registro";

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      numeroDia: numeroDia.value,
      inicioJornada: inicioJornada.value,
      finJornada: finJornada.value,
      estado: estado.value,
    }),
  })
    .then(response => response.json())
    .then(data => {
      const nuevaHorario = [];
      nuevaHorario.push(data);
      mostrar(nuevaHorario);
    })
    .then(() => location.reload())
    .catch(error => console.error('Error al guardar en la base de datos:', error));
}

function eliminarHorario(idHorario) {
  var url = `http://localhost:4000/horario/eliminar/ `;

  fetch(url+idHorario, {
      method: 'DELETE',
  })
  .then(response => {
      if (response.status === 204) {
          // El servidor respondió con éxito
          console.log('Registro borrado exitosamente');
          location.reload(); // O cualquier acción adicional que desees realizar después del borrado
      } 
  })
  .catch(error => console.error('Error al enviar solicitud de borrado:', error));
}
