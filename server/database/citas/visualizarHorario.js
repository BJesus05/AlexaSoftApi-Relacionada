
let dataTable;
let dataTableIsInitialized = false;

let dataTableOptions = {
  dom: "Bfrtilp",
  buttons: [
    {
      text: 'Crear <i class="fa-solid fa-folder-plus"></i>',
      titleAttr: "Crear",
      className: "btn btn-warning",
      action: function (e, dt, node, config) {
        openCreateModal();
      },
    },
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
      customize: function (win) {
        let table = $(win.document.body).find("table").DataTable();
        table.columns().every(function (index) {
          if (!table.column(index).visible()) {
            table.column(index).visible(false);
          }
        });
      },
      exportOptions: {
        columns: ":visible",
      },
    },
    "colvis",
  ],
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
    { orderable: false, targets: [2] },
    // { searchable: false, targets: [1] }, (Este es el buscar por columna especifica)
    { width: "20%", targets: [1] },
  ],
  pageLength: 3,
  destroy: true,
  language: {
    processing: "Procesando...",
    lengthMenu: "Mostrar _MENU_ registros",
    zeroRecords: "No se encontraron resultados",
    emptyTable: "Ningún dato disponible en esta tabla",
    infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
    infoFiltered: "(filtrado de un total de _MAX_ registros)",
    search: "Buscar:",
    infoThousands: ",",
    loadingRecords: "Cargando...",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "Siguiente",
      previous: "Anterior",
    },
    aria: {
      sortAscending: ": Activar para ordenar la columna de manera ascendente",
      sortDescending: ": Activar para ordenar la columna de manera descendente",
    },
    buttons: {
      copy: "Copiar",
      colvis: "Visibilidad",
      collection: "Colección",
      colvisRestore: "Restaurar visibilidad",
      copyKeys:
        "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.",
      copySuccess: {
        1: "Copiada 1 fila al portapapeles",
        _: "Copiadas %ds fila al portapapeles",
      },
      copyTitle: "Copiar al portapapeles",
      csv: "CSV",
      excel: "Excel",
      pageLength: {
        "-1": "Mostrar todas las filas",
        _: "Mostrar %d filas",
      },
      pdf: "PDF",
      print: "Imprimir",
      renameState: "Cambiar nombre",
      updateState: "Actualizar",
      createState: "Crear Estado",
      removeAllStates: "Remover Estados",
      removeState: "Remover",
      savedStates: "Estados Guardados",
      stateRestore: "Estado %d",
    },
    autoFill: {
      cancel: "Cancelar",
      fill: "Rellene todas las celdas con <i>%d</i>",
      fillHorizontal: "Rellenar celdas horizontalmente",
      fillVertical: "Rellenar celdas verticalmentemente",
    },
    decimal: ",",
    searchBuilder: {
      add: "Añadir condición",
      button: {
        0: "Constructor de búsqueda",
        _: "Constructor de búsqueda (%d)",
      },
      clearAll: "Borrar todo",
      condition: "Condición",
      conditions: {
        date: {
          after: "Despues",
          before: "Antes",
          between: "Entre",
          empty: "Vacío",
          equals: "Igual a",
          notBetween: "No entre",
          notEmpty: "No Vacio",
          not: "Diferente de",
        },
        number: {
          between: "Entre",
          empty: "Vacio",
          equals: "Igual a",
          gt: "Mayor a",
          gte: "Mayor o igual a",
          lt: "Menor que",
          lte: "Menor o igual que",
          notBetween: "No entre",
          notEmpty: "No vacío",
          not: "Diferente de",
        },
        string: {
          contains: "Contiene",
          empty: "Vacío",
          endsWith: "Termina en",
          equals: "Igual a",
          notEmpty: "No Vacio",
          startsWith: "Empieza con",
          not: "Diferente de",
          notContains: "No Contiene",
          notStartsWith: "No empieza con",
          notEndsWith: "No termina con",
        },
        array: {
          not: "Diferente de",
          equals: "Igual",
          empty: "Vacío",
          contains: "Contiene",
          notEmpty: "No Vacío",
          without: "Sin",
        },
      },
      data: "Data",
      deleteTitle: "Eliminar regla de filtrado",
      leftTitle: "Criterios anulados",
      logicAnd: "Y",
      logicOr: "O",
      rightTitle: "Criterios de sangría",
      title: {
        0: "Constructor de búsqueda",
        _: "Constructor de búsqueda (%d)",
      },
      value: "Valor",
    },
    searchPanes: {
      clearMessage: "Borrar todo",
      collapse: {
        0: "Paneles de búsqueda",
        _: "Paneles de búsqueda (%d)",
      },
      count: "{total}",
      countFiltered: "{shown} ({total})",
      emptyPanes: "Sin paneles de búsqueda",
      loadMessage: "Cargando paneles de búsqueda",
      title: "Filtros Activos - %d",
      showMessage: "Mostrar Todo",
      collapseMessage: "Colapsar Todo",
    },
    select: {
      cells: {
        1: "1 celda seleccionada",
        _: "%d celdas seleccionadas",
      },
      columns: {
        1: "1 columna seleccionada",
        _: "%d columnas seleccionadas",
      },
      rows: {
        1: "1 fila seleccionada",
        _: "%d filas seleccionadas",
      },
    },
    thousands: ".",
    datetime: {
      previous: "Anterior",
      next: "Proximo",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
      unknown: "-",
      amPm: ["AM", "PM"],
      months: {
        0: "Enero",
        1: "Febrero",
        10: "Noviembre",
        11: "Diciembre",
        2: "Marzo",
        3: "Abril",
        4: "Mayo",
        5: "Junio",
        6: "Julio",
        7: "Agosto",
        8: "Septiembre",
        9: "Octubre",
      },
      weekdays: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    },
    editor: {
      close: "Cerrar",
      create: {
        button: "Nuevo",
        title: "Crear Nuevo Registro",
        submit: "Crear",
      },
      edit: {
        button: "Editar",
        title: "Editar Registro",
        submit: "Actualizar",
      },
      remove: {
        button: "Eliminar",
        title: "Eliminar Registro",
        submit: "Eliminar",
        confirm: {
          _: "¿Está seguro que desea eliminar %d filas?",
          1: "¿Está seguro que desea eliminar 1 fila?",
        },
      },
      error: {
        system:
          'Ha ocurrido un error en el sistema (<a target="\\" rel="\\ nofollow" href="\\">Más información&lt;\\/a&gt;).</a>',
      },
      multi: {
        title: "Múltiples Valores",
        info: "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
        restore: "Deshacer Cambios",
        noMulti:
          "Este registro puede ser editado individualmente, pero no como parte de un grupo.",
      },
    },
    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    stateRestore: {
      creationModal: {
        button: "Crear",
        name: "Nombre:",
        order: "Clasificación",
        paging: "Paginación",
        search: "Busqueda",
        select: "Seleccionar",
        columns: {
          search: "Búsqueda de Columna",
          visible: "Visibilidad de Columna",
        },
        title: "Crear Nuevo Estado",
        toggleLabel: "Incluir:",
      },
      emptyError: "El nombre no puede estar vacio",
      removeConfirm: "¿Seguro que quiere eliminar este %s?",
      removeError: "Error al eliminar el registro",
      removeJoiner: "y",
      removeSubmit: "Eliminar",
      renameButton: "Cambiar Nombre",
      renameLabel: "Nuevo nombre para %s",
      duplicateError: "Ya existe un Estado con este nombre.",
      emptyStates: "No hay Estados guardados",
      removeTitle: "Remover Estado",
      renameTitle: "Cambiar Nombre Estado",
    },
  },
};

const openCreateModal = () => {
  $("#staticBackdrop").modal("show");
};

let users = [];
const updateFilteredList = () => {
  const inputValue = $("#campo4").val().toLowerCase();

  const listResultados = $("#resultadoBusquedaCampo4");
  listResultados.empty();

  if (inputValue.trim() === "") {
    return;
  }

  const filteredData = users.filter((user) =>
    Object.values(user).some((value, key) => {
      if (key === 1 && user.name.toLowerCase().includes(inputValue)) {
        // Si la búsqueda es por "nombre", mostrar el "ID" (Cambiar según solicitud si no se va usar, coloquen este codigo en bloque de comentario)
        return true;
      }
      return String(value).toLowerCase().includes(inputValue);
    })
  );

  if (filteredData.length > 0) {
    filteredData.forEach((result) => {
      const listItem = $("<li>").text("Resultado: " + result.id).addClass("list-group-item");
      listResultados.append(listItem);
    });
  } else {
    const listItem = $("<li>")
      .text("No se encontraron resultados.")
      .addClass("list-group-item");
    listResultados.append(listItem);
  }
};

const initDataTable = async () => {
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  await listUsers();

  dataTable = $("#example").DataTable(dataTableOptions);

  $("#campo4").on("input", function () {
    dataTable.column(".campo4:name").search($(this).val()).draw();
    updateFilteredList();
  });

  dataTableIsInitialized = true;
};

const listUsers = async () => {
  try {
    const response = await fetch("http://localhost:4000/horario/");
    users = await response.json();
    console.log(users);

    let content = ``;
    users.forEach((user, idHorario) => {
      content += `
              <tr>
                  <td> ${idHorario + 1} </td>
                  <td> ${user.numeroDia} </td>
                  <td> ${user.incioJornada} </td>
                  <td> ${user.finJornada} </td>
                  <td class="campo4"> ${user.estado} </td>
                  <td><i class="fa-solid fa-circle-check"></i></td>
                  <td>
                      <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa-solid fa-pencil"></i></button>
                      <button class="btn btn-sm btn-danger" onclick="confirmDelete(${idHorario})"><i class="fa-solid fa-trash-can"></i></button>
                  </td>
              </tr>`;
    });
    $("#horario").html(content);
  } catch (error) {
    alert(error);
  }
};

$(document).ready(async () => {
  await initDataTable();
});
