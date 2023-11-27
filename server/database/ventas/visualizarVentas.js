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

  await listVentas();

  dataTable = $("#example").DataTable(dataTableOptions);

  dataTableIsInitialized = true;
};

const listVentas = async () => {
  try {
    const response = await fetch("http://localhost:4000/ventas");
    const ventas = await response.json();

    let content = ``;
    ventas.forEach((venta) => {
      console.log("venta   ", JSON.stringify(venta))
      content += `
  <tr>
    <td> ${venta.idVenta} </td>
    <td> ${venta.numeroFactura} </td>
    <td> ${venta.idCotizacion} </td>
    <td> ${venta.nombreColaborador} </td>
    <td> ${venta.fecha} </td>
    <td>
    <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="verVenta(${JSON.stringify(venta).replace(/"/g, "&quot;")})" title="Ver Detalles de la Venta">
  <i class="fa-solid fa-eye"></i>
</button>
    </td>
  </tr>`;
    });
    $("#ventas").html(content);
  } catch (error) {
    alert(error);
  }
};

$(document).ready(async () => {
  await initDataTable();
});
