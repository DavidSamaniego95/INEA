$(function(){
  switch (parseInt(getUser().permissions)) {
    case 0:
      window.open("http://localhost:5501/HTML/HojasUnicaLec.html", "_self"); //lec
      break;
    case 1:
      window.open("http://localhost:5501/HTML/HojasUnica.html", "_self"); //lec/esc
      break;
    case 2:
      window.open("http://localhost:5501/HTML/HojasUnica.html", "_self"); //admin
      break;
    default :
    break;
  }
});

function login() {
  $.ajax({
    url: "http://localhost:3000/inea/hojaunica/api/v1/usuarios/login",
    dataType: "json",
    ContentType: "application/json;charset=utf-8",
    type: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    },
    data: JSON.stringify({
      user: $("#inputUsr").val(),
      pass: $("#inputPass").val()
    })
  })
    .done(function(data) {
      console.log("se consulto correctamente");
      //document.cookie = "user=" + data.token +"; path=/";
      localStorage.setItem("_userU", data.token);
      switch (parseInt(getUser().permissions)) {
        case 0:
          console.log(getUser());//window.open("http://localhost:5501/HTML/HojasUnicaLec.html", "_self"); //lec
          break;
        case 1:
          console.log(getUser());//window.open("http://localhost:5501/HTML/HojasUnica.html", "_self"); //lec/esc
          break;
        case 2:
          console.log(getUser());//window.open("http://localhost:5501/HTML/HojasUnica.html", "_self"); //admin
          break;
      }
    })
    .fail(function(data) {
      console.log(data.responseText);
    });
}