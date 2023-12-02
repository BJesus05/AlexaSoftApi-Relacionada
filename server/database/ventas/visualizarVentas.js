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
      customize: function (doc) {
        //Borrar titulo por defecto
        doc.content.splice(0, 1);

        var now = new Date();
        var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
        //Margen de la tabla
        doc.pageMargins = [20, 80, 20, 30];

        //Encabezado propio
        doc['header'] = (function () {
          return {
            columns: [

              {
                alignment: 'left',
                text: "Alexandra Torres:\nNit: 145.236.742-2",
                fontSize: 12,
                margin: [10, 0]
              },
              {
                alignment: "right",
                text: 'Fecha:' + jsDate,
                fontSize: 12,
                margin: [10, 0]

              }
            ],
            margin: 10

          }
        });

        //Lineas y padding en la tabla
        var objLayout = {};
        objLayout['hLineWidth'] = function () { return .5; };
        objLayout['vLineWidth'] = function () { return .5; };
        objLayout['hLineColor'] = function () { return '#aaa'; };
        objLayout['vLineColor'] = function () { return '#aaa'; };
        objLayout['paddingLeft'] = function () { return 4; };
        objLayout['paddingRight'] = function () { return 4; };
        doc.content[0].layout = objLayout;
      }
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
