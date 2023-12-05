async function cargarPaquete() {
    try {
        const respuesta = await fetch("http://localhost:4000/paquete");
        const paquetes = await respuesta.json();

        let contenido = ``;
        paquetes.forEach((paquete) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${paquete.idPaquete}">${paquete.nombre}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("idPaquete").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}

async function cargarServicio() {
    try {
        const respuesta = await fetch("http://localhost:4000/servicios");
        const servicio = await respuesta.json();

        let contenido = ``;
        servicio.forEach((servicios) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${servicios.idServicio}">${servicios.nombre}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("idServicio").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}

async function cargarProducto() {
    try {
        const respuesta = await fetch("http://localhost:4000/productos");
        const producto = await respuesta.json();

        let contenido = ``;
        producto.forEach((productos) => {
            contenido += `<option class="form-select" aria-label="Default select example" value="${productos.idProducto}">${productos.nombre}</option>`;
        });

        // Establecer el contenido en el elemento select
        document.getElementById("idProducto").innerHTML = contenido;
    } catch (error) {
        alert(error);
    }
}



cargarPaquete();
cargarServicio();
cargarProducto();