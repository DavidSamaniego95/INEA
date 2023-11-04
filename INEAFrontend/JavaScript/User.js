$(function() {
  $.ajax({
    url:
      "http://localhost:3000/inea/hojaunica/api/v1/usuarios/" +
      localStorage.getItem("_id"),
    dataType: "json",
    ContentType: "application/json;charset=utf-8",
    type: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .done(function(data) {
      $("#inputNombre").val(data.usuario.name);
      $("#inputApellidos").val(data.usuario.lastname);
      $("#inputNoTrab").val(data.usuario.idworker);
      $("#comboPuesto").val(data.usuario.job);
      $("#inputUsr").val(data.usuario.user);
      $("#inputPass").val(data.usuario.pass);
      $("#comboPermisos").val(data.usuario.permissions);
    })
    .fail(function(data) {
      console.log("No se consulto correctamente");
    });
});
function cerrar() {
  localStorage.removeItem("_id");
  window.open("http://localhost:5501/HTML/Users.html", "_self");
}

function cancel() {
  document.getElementById("divDetalles").removeAttribute("hidden");
  document.getElementById("chkMostrarPass").removeAttribute("hidden");
  document.getElementById("lblMostrarPass").removeAttribute("hidden");
  document.getElementById("inputPass").type = "password";
  document.getElementById("divUpdate").setAttribute("hidden", true);
  document.getElementById("inputPassConfirm").setAttribute("hidden", true);
  $("#inputNombre").prop("readonly", true);
  $("#inputApellidos").prop("readonly", true);
  $("#inputApellidoP").prop("readonly", true);
  $("#inputNoTrab").prop("readonly", true);
  $("#inputUsr").prop("readonly", true);
  $("#inputPass").prop("readonly", true);
}

function EditUsr() {
  document.getElementById("divDetalles").setAttribute("hidden", true);
  document.getElementById("divUpdate").removeAttribute("hidden");
  document.getElementById("chkMostrarPass").setAttribute("hidden",true);
  document.getElementById("lblMostrarPass").setAttribute("hidden",true);
  document.getElementById("inputPass").type = "text";
  document.getElementById("inputPassConfirm").removeAttribute("hidden");
  document.getElementById("chkMostrarPass").checked = false;
  $("#inputNombre").prop("readonly", false);
  $("#inputApellidos").prop("readonly", false);
  $("#inputApellidoP").prop("readonly", false);
  $("#inputNoTrab").prop("readonly", false);
  $("#inputUsr").prop("readonly", false);
  $("#inputPass").prop("readonly", false);
}
function GuardarUsr() {
  if ($("#inputPass").val() != $("#inputPassConfirm").val()) {
    console.log("contraseñas diferentes");
  } else {
    $.ajax({
      url:
        "http://localhost:3000/inea/hojaunica/api/v1/usuarios/" +
        localStorage.getItem("_id"),
      type: "PUT",
      data: {
        name: $("#inputNombre").val(),
        lastname: $("#inputApellidos").val(),
        idworker: $("#inputNoTrab").val(),
        job: $("#comboPuesto").val(),
        user: $("#inputUsr").val(),
        pass: $("#inputPass").val(),
        permissions: $("#comboPermisos").val()
      }
    })
      .done(function(data) {
        console.log("se guardo correctamente");
        $("#inputNombre").val("");
        $("#inputApellidos").val("");
        $("#inputNoTrab").val("");
        $("#comboPuesto").val("");
        $("#inputUsr").val("");
        $("#inputPass").val("");
        $("#comboPermisos").val("");
        cancelar();
      })
      .fail(function(data) {
        console.log("No se guardo");
      });
  }
}

function newUsr() {
  if ($("#inputPass").val() != $("#inputPassConfirm").val()) {
    console.log("contraseñas diferentes");
  } else {
    $.ajax({
      url: "http://localhost:3000/inea/hojaunica/api/v1/usuarios",
      type: "POST",
      data: {
        name: $("#inputNombre").val(),
        lastname: $("#inputApellidos").val(),
        idworker: $("#inputNoTrab").val(),
        job: $("#comboPuesto").val(),
        user: $("#inputUsr").val(),
        pass: $("#inputPass").val(),
        permissions: $("#comboPermisos").val()
      }
    }).done(function (data) { console.log('se guardo correctamente');
     $("#inputNombre").val("");
     $("#inputApellidos").val("");
     $("#inputNoTrab").val("");
     $("#comboPuesto").val("");
     $("#inputUsr").val("");
     $("#inputPass").val("");
     $("#comboPermisos").val("");
     cancelar();
  })
      .fail(function (data) { console.log('No se guardo'); });
  }
}
function cancelar() {
  window.open("http://localhost:5501/HTML/Users.html","_self");
}

function mostrar() {
  let campo = document.getElementById("inputPass");
  if(campo.type === "password"){
    campo.type = "text";
  }else{
    campo.type = "password";
  }
}