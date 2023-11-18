function validarFormulario() {
  // Deshabilitar temporalmente las validaciones predeterminadas
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  // Validar Campo 1
  var campo1 = document.getElementById("campo1");
  if (campo1.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 1");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!campo1.checkValidity()) {
    mostrarAlerta("Campo 1: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 2
  var campo2 = document.getElementById("campo2");
  if (campo2.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 2");
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!campo2.checkValidity()) {
    mostrarAlerta("Campo 2: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 3
  var campo3 = document.getElementById("campo3");
  if (campo3.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 3");
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!campo3.checkValidity()) {
    mostrarAlerta("Campo 3: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 4
  var campo4 = document.getElementById("campo4");
  if (campo4.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 4");
    return false;                                               // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!campo4.checkValidity()) {
    mostrarAlerta("Campo 4: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 5 (estadoSelect)
  var estadoSelect = document.getElementById("estadoSelect");
  var selectedOption = estadoSelect.options[estadoSelect.selectedIndex];
  if (selectedOption.value === "") {                                            // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
    mostrarAlerta("Campo 5: Por favor, selecciona un estado válido.");
    return false;
  }
  // Si todos los campos son válidos, el formulario se envía
  document.getElementById("miFormulario").submit();
}

function mostrarAlerta(mensaje) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
}
