let table = $("#tblPrueba").DataTable({
  ajax: {
    url: "http://localhost:3000/inea/hojaunica/api/v1/usuarios",
    type: "GET",
    dataSrc: function(params) {
      console.log(params.usuarios);
      return params.usuarios;
    }
  },
  columns: [
    { data: "name" },
    { data: "lastname" },
    { data: "user" },
    {
      data: function(row) {
        if(row["permissions"]==0) return "Lectura";
        if(row["permissions"]==1) return "Intermedio";
        if(row["permissions"]==2) return "Administrador";
      }
    },
    {
      data: function(row) {
        return "<div><button class='btn btn-outline-light btn-sm mx-1' onclick='detalles(\""+row["_id"]+"\")'><img class='glyphicon-object-align-vertical'src='../Recursos/magnifying-glass.svg'/></button></button><button class='btn btn-outline-light btn-sm mx-1' onclick='eliminarRegistro(\"" + row["_id"] + "\")'><img class='glyphicon-object-align-vertical'src='../Recursos/trash.svg'/></button>";
      }
    }
  ],
  language: {
    url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
  }
});

function nuevo() {
window.open("http://localhost:5501/HTML/CUser.html","_self");
}

function detalles(id) {
localStorage.setItem('_id', id);
window.open("http://localhost:5501/HTML/User.html","_self");
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
            url: "http://localhost:3000/inea/hojaunica/api/v1/usuarios/" + id,
            type: "DELETE",
            data: {}
          })
            .done(function(data) {
              swal("Se elimino el registro", {
                icon: "success"
              });
              $("#tblPrueba").dataTable().api().ajax.reload(null, false);
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