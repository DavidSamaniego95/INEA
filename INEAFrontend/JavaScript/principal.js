function getUser() {
    const payload =  //document.cookie.replace('user=','').split('.')[1] ;//
    localStorage.getItem("_userU").split('.')[1];
    const payloadString = payload.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payloadString)).user;
}


function imprimirHojaUnica() {
window.print();
}

function logout() {
    $.ajax({
      url: "http://localhost:3000/inea/hojaunica/api/v1/usuarios/logout",
      dataType: "json",
      ContentType: "application/json;charset=utf-8",
      type: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      },
      data: JSON.stringify({
        token://document.cookie.replace('user=','') //
        localStorage.getItem("_userU")
      })
    })
      .done(function(data) {
        //document.cookie = "user= ''; path=/";//
        localStorage.clear();
        window.open("http://localhost:5501/HTML/login.html","_self");
        console.log("se cerro sesion correctamente");
      })
      .fail(function(data) {
        console.log("No se cerro sesion");
        console.log(data);
      });
  }