document
  .getElementById("miFormulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    validarFormulario();
  });

function validarFormulario() {
  document.getElementById("miFormulario").setAttribute("novalidate", "true");

  var idServicio = document.getElementById("idServicio");
  var idServicioSeleccionado = idServicio.options[idServicio.selectedIndex];
  if (idServicioSeleccionado.value === "") {
    mostrarAlerta("Rol: Por favor, selecciona un rol válido.");
    return false;
  }

  var idProducto = document.getElementById("idProducto");
  var idProductoSeleccionado = idProducto.options[idProducto.selectedIndex];
  if (idProductoSeleccionado.value === "") {
    mostrarAlerta("Estado: Por favor, selecciona un estado válido.");
    return false;
  }

  var cantidad = document.getElementById("cantidad");
  if (cantidad.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese la cantidad");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } 

  // Validar Campo 4
  var unidadMedida = document.getElementById("unidadMedida");
  if (unidadMedida.value.trim() === "") {
    mostrarAlerta("Por favor, Ingrese un estado");
    return false; // Modifiquen la validación según el campo que tengan, de caso contrario dejenlo.
  } else if (!unidadMedida.checkValidity()) {
    mostrarAlerta("Campo 4: Por favor, ingrese solo letras.");
    return false;
  }




  var btnConfirmar = document.getElementById("btnConfirmar");
  var idProductoXServicio = btnConfirmar.getAttribute("data-idproductoxservicio");

  if (idProductoXServicio) {
    guardarCambios(idProductoXServicio);
  } else {
    mostrarAlertaExitosa("Validación exitosa. Creando nuevo productoXservicio");
    guardarProductoXServicio();
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

function guardarProductoXServicio() {

  const idServicioSelect = document.getElementById("idServicio");
  const idServicioSeleccionado = idServicioSelect.value;
  const idServicio = idServicioSeleccionado;

  
  const idProductoSelect = document.getElementById("idProducto");
  const idProductoSeleccionado = idProductoSelect.value;
  const idProducto = idProductoSeleccionado;

  const cantidad = document.getElementById("cantidad");

  const unidadMedidaSelect = document.getElementById("unidadMedida");
  const unidadMedidaSeleccionado = unidadMedidaSelect.value;
  const unidadMedida = unidadMedidaSeleccionado;

  const url = "http://localhost:4000/ServiciosProductos/registro";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idServicio: idServicio,
      idProducto: idProducto,
      cantidad: cantidad,
      unidadMedida: unidadMedida,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al guardar en la base de datos");
      }
      return response.json();
    })
    .then((data) => {
      const nuevoProduServi = [];
      nuevoProduServi.push(data);
      mostrar(nuevoProduServi);
      location.reload();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const confirmDelete = (idProductoXServicio) => {
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
        eliminarproductoServicio(idProductoXServicio).then((eliminado) => {
          if (eliminado) {
            location.reload();
          }
        });
      });
    }
  });
};

const eliminarproductoServicio = async (idProductoXServicio) => {
  console.log(idProductoXServicio)
  var url = `http://localhost:4000/ServiciosProductos/eliminar/${idProductoXServicio}`;
  console.log(url)

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      await listUsers();
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

function editarServicioXProducto(idProductoXServicio) {

  const idServicioSelect = document.getElementById("idServicio");
  const idServicioSeleccionado = idServicioSelect.value;
  const idServicio = idServicioSeleccionado;

  const idProductoSelect = document.getElementById("idProducto");
  const idProductoSeleccionado = idProductoSelect.value;
  const idProducto = idProductoSeleccionado;

  const cantidad = document.getElementById("cantidad");

  const unidadMedidaSelect = document.getElementById("unidadMedida");
  const unidadMedidaSeleccionado = unidadMedidaSelect.value;
  const unidadMedida = unidadMedidaSeleccionado;

  $("#idServicio").val(idServicio);
  $("#idProducto").val(idProducto);
  $("#cantidad").val(cantidad);
  $("#unidadMedida").val(unidadMedida);

  $("#btnConfirmar").attr("data-idproductoxservicio", idProductoXServicio);

  openCreateModal();
}

const guardarCambios = async (idProductoXServicioSeleccionado) => {
  if (idProductoXServicioSeleccionado) {
    const idProductoXServicio = idProductoXServicioSeleccionado;


    const idServicio = $("#idServicio").val();
    const idProducto = $("#idProducto").val();
    const cantidad = $("#cantidad").val();
    const unidadMedida = $("#unidadMedida").val();


    try {
      const response = await fetch(
        `http://localhost:4000/ServiciosProductos/editar/${idProductoXServicioSeleccionado}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idServicio,
            idProducto,
            cantidad,
            unidadMedida,
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
