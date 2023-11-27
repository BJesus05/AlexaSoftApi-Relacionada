async function cargarMotivos() {
    try {
        const respuesta = await fetch("http://localhost:4000/motivoscancelacion");
        const motivos = await respuesta.json();

        let contenido = ``;
        motivos.forEach((motivo) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${motivo.idMotivo}">${motivo.motivo}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("motivoCancelacion").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}

async function cargarHorario() {
    try {
        const respuesta = await fetch("http://localhost:4000/horario");
        const horarios = await respuesta.json();

        let contenido = ``;
        horarios.forEach((horario) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${horario.idHorario}">${horario.numeroDia}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("horarioCita").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}

async function cargarUsuario() {
    try {
        const respuesta = await fetch("http://localhost:4000/usuario");
        const usuarios = await respuesta.json();

        let contenido = ``;
        usuarios.forEach((usuario) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${usuario.idUsuario}">${usuario.cedula}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("usuarioCita").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}

async function cargarPaquete() {
    try {
        const respuesta = await fetch("http://localhost:4000/paquete");
        const paquetes = await respuesta.json();

        let contenido = ``;
        paquetes.forEach((paquete) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${paquete.idPaquete}">${paquete.nombre}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("paqueteCita").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}

async function cargarMotivosEditar() {
    try {
        const respuesta = await fetch("http://localhost:4000/motivoscancelacion");
        const motivos = await respuesta.json();

        let contenido = ``;
        motivos.forEach((motivo) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${motivo.idMotivo}">${motivo.motivo}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("motivoCancelacionEditar").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}


// Llamar a la función para cargar los datos en el desplegable
cargarMotivos();
cargarHorario();
cargarUsuario();
cargarPaquete();
cargarMotivosEditar();