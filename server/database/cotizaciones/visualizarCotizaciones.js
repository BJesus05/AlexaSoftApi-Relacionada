let dataTable;
let dataTableIsInitialized = false;

let dataTableOptions = {
  dom: "Bfrtilp",
  buttons: [
    {
      extend: "excelHtml5",
      text: ' Excel <i class="fas fa-file-excel"></i>',
      titleAttr: "Exportar a Excel",
      className: "btn btn-success",
      exportOptions: {
        columns: ":visible",
      },
    },
    {
      extend: "pdfHtml5",
      text: ' PDF <i class="fas fa-file-pdf"></i> ',
      titleAttr: "Exportar a PDF",
      className: "btn btn-danger",
      exportOptions: {
        columns: ":visible",
      },
    },
    {
      extend: "print",
      text: ' Imprimir <i class="fa fa-print"></i>',
      titleAttr: "Imprimir",
      className: "btn btn-info",
      exportOptions: {
        columns: ":visible",
      },
    },
    "colvis",
  ],
  lengthMenu: [5, 10, 15],
  pageLength: 5,
  destroy: true,
};


const initDataTable = async () => {
  await listCotizaciones();
  dataTable = $("#example").DataTable(dataTableOptions);
  dataTableIsInitialized = true;
};

const listCotizaciones = async () => {
  try {
    const response = await fetch("http://localhost:4000/cotizaciones");
    const cotizaciones = await response.json();

    let content = ``;
    cotizaciones.forEach((cotizacion) => {
      //console.log("cotizacion   ", JSON.stringify(cotizacion))
      content += `
  <tr>
    <td> ${cotizacion.idCotizacion} </td>
    <td> ${cotizacion.nombreCliente} </td>
    <td> ${cotizacion.cotizacion_fechaCreacion} </td>
    <td> ${cotizacion.cotizacion_fechaFinalizacion} </td>
    <td> ${cotizacion.estado} </td>
    <td> ${cotizacion.productos} </td>
    <td> ${cotizacion.total} </td>
    <td>
      ${cotizacion.estado === "espera" ? `
        <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editarCotizacion(${JSON.stringify(cotizacion).replace(/"/g, "&quot;")})">
          <i class="fa-solid fa-pencil"></i>
        </button>` : ''}
        ${cotizacion.estado !== "aceptado" ? `
      <button class="btn btn-sm btn-danger" onclick="confirmDelete(${cotizacion.idCotizacion})"><i class="fa-solid fa-trash-can"></i></button>` : ''}
    </td>
  </tr>`;
    });
    $("#cotizaciones").html(content);
  } catch (error) {
    alert(error);
  }
};

$(document).ready(async () => {
  await initDataTable();
});