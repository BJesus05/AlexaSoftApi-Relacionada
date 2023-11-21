 document.getElementById("miFormulario").addEventListener("submit", function (event) {
     event.preventDefault();
     validarFormulario();
   });
  
   function validarFormulario() {
   document.getElementById("miFormulario").setAttribute("novalidate", "true");
  
   var idRol = document.getElementById("idRol");
  
   if (idRol.value.trim() === "") {
     mostrarAlerta("Por favor, selecciona una opcion");
     return false; 
   } else if (estado.value.trim() === ""){
     mostrarAlerta("Por favor, selecciona una opcion");
     return false; 
   }
  
   var btnConfirmar = document.getElementById("btnConfirmar");
   var idUsuario = btnConfirmar.getAttribute("data-idusuario");
  
   guardarCambios(idUsuario);
  
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
  
   const eliminarUsuario = async (idUsuario) => {
     var url = `http:localhost:4000/usuarios/${idUsuario}`;
  
     try {
       const response = await fetch(url, {
         method: "DELETE",
       });
  
       if (response.ok) {
         await listUsuarios()
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
  
   const editarUsuario = (usuario) => {
     $("#btnConfirmar").attr("data-idusuario", usuario.idUsuario);
     openCreateModal();
   };
  
   const guardarCambios = async (idUsuarioSeleccionado) => {
     if (idUsuarioSeleccionado) {
       const idUsuario = idUsuarioSeleccionado;
       const idRol = $("#idRol").val();
       const estado = $("#estado").val();
  
       try {
         const response = await fetch(
           `http:localhost:4000/usuarios/${idUsuario}`,
           {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({
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
  