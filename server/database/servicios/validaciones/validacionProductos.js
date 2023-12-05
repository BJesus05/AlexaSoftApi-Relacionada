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
  var marca = document.getElementById("marca");
  if (marca.value.trim() === "") {
    mostrarAlerta("Por favor, completa el campo 1");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!marca.checkValidity()) {
    mostrarAlerta("Marca: Por favor, ingrese solo letras.");
    return false;
  }

  // Validar Campo 3
  var precio = document.getElementById("precio");
  if (precio.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese el precio");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } 

  var unidades = document.getElementById("unidades");
  if (unidades.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese las unidades");
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
  var idProducto = btnConfirmar.getAttribute("data-idproducto");

  if (idProducto) {
    guardarCambios(idProducto);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo producto...");
    guardarproducto();
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

const confirmDelete = (idProducto) => {
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
        eliminarProducto(idProducto).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

function guardarproducto() {
  const nombre = document.getElementById("nombre");
  const marca = document.getElementById("marca");
  const precio = document.getElementById("precio");
  const unidades = document.getElementById("unidades");
  const estadoSelect = document.getElementById("estado");
  const estadoSeleccionado = estadoSelect.value;
  const estado = estadoSeleccionado;


  const url = "http://localhost:4000/productos/registro";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      marca: marca.value,
      precio: precio.value,
      unidades: unidades.value,
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
      const nuevaProducto = [];
      nuevaProducto.push(data);
      mostrar(nuevaProducto);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function eliminarProducto(idServicio) {
  var url = `http://localhost:4000/productos/eliminar/`;

  return fetch(url + idServicio, {
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

const editarProducto = (idProducto) => {
  const producto = users.find((user) => user.idProducto === idProducto);

  $("#nombre").val(producto.nombre);
  $("#marca").val(producto.marca);
  $("#precio").val(producto.precio);
  $("#unidades").val(producto.unidades);
  $("#estado").val(producto.estado);
  $("#btnConfirmar").attr("data-idproducto", idProducto);

  $("#staticBackdrop").modal("show");
};

const guardarCambios = async (productoidSeleccionado) => {
  if (productoidSeleccionado) {
    const idProducto = productoidSeleccionado;
    console.log(idProducto)
    const nombre = $("#nombre").val();
    const marca = $("#marca").val();
    const precio = $("#precio").val();
    const unidades = $("#unidades").val();
    const estado = $("#estado").val();


    try {
      const response = await fetch(
        `http://localhost:4000/productos/editar/${idProducto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            marca,
            precio,
            unidades,
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
      productoidSeleccionado = null;
    }
  }
};
