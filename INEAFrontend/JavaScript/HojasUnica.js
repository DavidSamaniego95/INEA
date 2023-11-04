$(function() {
  if (getUser().permissions == 2) {
    $("#navegar").append(
      '<li class="mx-1"><a class="nav-link" href="http://localhost:5501/HTML/HojasUnica.html">Hoja Única</a></li><li class="mx-1"><a class="nav-link" href="http://localhost:5501/HTML/Users.html">Usuarios</a></li>'
    );
    let table = $("#tblHojaU").DataTable({
      ajax: {
        url: "http://localhost:3000/inea/hojaunica/api/v1/hojaUnica",
        type: "GET",
        dataSrc: function(params) {
          console.log(params.hojasU);
          return params.hojasU;
        }
      },
      columns: [
        { data: "rfc" },
        { data: "name" },
        { data: "lastnameP" },
        { data: "state" },
        {
          data: function(row) {
            return (
              "<div><button class='btn btn-outline-light btn-sm mx-1' onclick='abrirDetalles(\"" +
              row["_id"] +
              "\")'><img class='glyphicon-object-align-vertical'src='../Recursos/magnifying-glass.svg'/></button><button class='btn btn-outline-light btn-sm mx-1' onclick='eliminarRegistro(\"" +
              row["_id"] +
              "\")'><img class='glyphicon-object-align-vertical'src='../Recursos/trash.svg'/></button>"
            );
          }
        }
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    });
  } else {
    let table = $("#tblHojaU").DataTable({
      ajax: {
        url: "http://localhost:3000/inea/hojaunica/api/v1/hojaUnica",
        type: "GET",
        dataSrc: function(params) {
          console.log(params.hojasU);
          return params.hojasU;
        }
      },
      columns: [
        { data: "rfc" },
        { data: "name" },
        { data: "lastnameP" },
        { data: "state" },
        {
          data: function(row) {
            return (
              "<div><button class='btn btn-outline-light btn-sm' onclick='abrirDetalles(\"" +
              row["_id"] +
              "\")'><img class='glyphicon-object-align-vertical'src='../Recursos/magnifying-glass.svg'/></button>"
            );
          }
        }
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    });
  }
});

function nuevo() {
  window.open("http://localhost:5501/HTML/CHojaUnica.html", "_self");
}

function abrirDetalles(id) {
  localStorage.setItem("_id", id);
  if (getUser().permissions == 0) {
    window.open("http://localhost:5501/HTML/HojaUnicaLec.html", "_self"); //no puede editar
  } else {
    window.open("http://localhost:5501/HTML/HojaUnica.html", "_self"); //puede editar
  }
}

function eliminarRegistro(id) {
  if (getUser().permissions == 2) {
    swal({
      title: "Estas seguro?",
      text: "No se puede revertir esta operacion!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        $.ajax({
            url: "http://localhost:3000/inea/hojaunica/api/v1/hojaUnica/" + id,
            type: "DELETE",
            data: {}
          })
            .done(function(data) {
              swal("Se elimino el registro", {
                icon: "success"
              });
              $("#tblHojaU").dataTable().api().ajax.reload(null, false);
            })
            .fail(function(data) {
              console.log(data);
            });
      } else {
        return;
      }
    });
  } else {
    //no tiene permisos para eliminar
    console.log("no tienes permisos");
  }
}