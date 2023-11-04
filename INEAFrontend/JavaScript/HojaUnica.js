$(function () {
    $.ajax({
        url: "http://localhost:3000/inea/hojaunica/api/v1/hojaUnica/" + localStorage.getItem('_id'),
        dataType: "json",
        ContentType: "application/json;charset=utf-8",
        type: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        },
    }).done(function (data) {
        console.log(data.hojaU);
        $("#inputNombres").val(data.hojaU.name);
        $("#inputApellidoM").val(data.hojaU.lastnameM);
        $("#inputApellidoP").val(data.hojaU.lastnameP);
        $("#inputRFC").val(data.hojaU.rfc);
        $("#inputHomoclave").val(data.hojaU.homoclave);
        $("#inputDireccion").val(data.hojaU.address);
        $("#inputNumero").val(data.hojaU.number);
        $("#inputColonia").val(data.hojaU.col);
        $("#inputCP").val(data.hojaU.postalcode);
        $("#inputCiudad").val(data.hojaU.city);
        $("#inputEstado").val(data.hojaU.state);
        $("#inputFechaNumIn").val(formatoFechaAmericano(data.hojaU.dateIn));
        $("#inputFechaLetIn").val(formatoFechaEscrito(data.hojaU.dateIn));
        $("#inputFechaNumBaj").val(formatoFechaAmericano(data.hojaU.dateOut));
        $("#inputFechaLetBaj").val(formatoFechaEscrito(data.hojaU.dateOut));
        secFin = data.hojaU.sectionFin;
        cargarDataTable("#tblBody", "#tblResumenSec3", secFin);
        $("#txtAobservaciones").val(data.hojaU.observations);
    })
        .fail(function (data) { console.log('No se consulto correctamente'); });
});

let secFin = [];
let jsonTable = [];

function agregar() {
    jsonTable = secFin;
    let objeto = {
        "reason": $('#inputMotivo').val(),
        "date1": $('#inputPeriodoDel').val(),
        "date2": $('#inputPeriodoAl').val(),
        "job": $('#inputPuesto').val(),
        "basicSalary": $('#inputSueldo').val(),
        "bonus": $('#inputSobresueldo').val(),
        "compensation": $('#inputCompen').val(),
        "quinquenniums": $('#inputQuinque').val(),
        "otherPerceptions": $('#inputOtras').val(),
        "total": $('#inputTotal').val()
    };
    jsonTable.push(objeto);
    cargarDataTable("#tblBodyModal", "#tblModal", jsonTable);
    limpiarForm();
}

function regresar() {
    localStorage.removeItem('_id');
    if (getUser().permissions == 0) {
        window.open("http://localhost:5501/HTML/HojasUnicaLec.html", "_self"); //regresa a hojasUnicaLec
    } else {
        window.open("http://localhost:5501/HTML/HojasUnica.html", "_self"); //regresa a hojasUnica
    }
}

function editar() {
    $("#inputNombres").prop("readonly", false);
    $("#inputApellidoM").prop("readonly", false);
    $("#inputApellidoP").prop("readonly", false);
    $("#inputRFC").prop("readonly", false);
    $("#inputHomoclave").prop("readonly", false);
    $("#inputDireccion").prop("readonly", false);
    $("#inputNumero").prop("readonly", false);
    $("#inputColonia").prop("readonly", false);
    $("#inputCP").prop("readonly", false);
    $("#inputCiudad").prop("readonly", false);
    $("#inputEstado").prop("readonly", false);
    $("#inputFechaNumIn").prop("readonly", false);
    $("#inputFechaNumBaj").prop("readonly", false);
    $("#txtAobservaciones").prop("readonly", false);
    document.getElementById("btnNuevo").removeAttribute("hidden");
    document.getElementById("btnEditar").removeAttribute("hidden");
    document.getElementById("btnCancel").removeAttribute("hidden");
    document.getElementById("btnGuardar").removeAttribute("hidden");
    document.getElementById("btnRegresar").setAttribute("hidden", true);
    document.getElementById("btnEditarDoc").setAttribute("hidden", true);
    document.getElementById("btnImprimir").setAttribute("hidden", true);
}

function cancelar() {
    document.getElementById("btnNuevo").setAttribute("hidden", true);
    document.getElementById("btnEditar").setAttribute("hidden", true);
    document.getElementById("btnCancel").setAttribute("hidden", true);
    document.getElementById("btnGuardar").setAttribute("hidden", true);
    document.getElementById("btnRegresar").removeAttribute("hidden");
    document.getElementById("btnEditarDoc").removeAttribute("hidden");
    document.getElementById("btnImprimir").removeAttribute("hidden");
    $("#inputNombres").prop("readonly", true);
    $("#inputApellidoM").prop("readonly", true);
    $("#inputApellidoP").prop("readonly", true);
    $("#inputRFC").prop("readonly", true);
    $("#inputHomoclave").prop("readonly", true);
    $("#inputDireccion").prop("readonly", true);
    $("#inputNumero").prop("readonly", true);
    $("#inputColonia").prop("readonly", true);
    $("#inputCP").prop("readonly", true);
    $("#inputCiudad").prop("readonly", true);
    $("#inputEstado").prop("readonly", true);
    $("#inputFechaNumIn").prop("readonly", true);
    $("#inputFechaLetIn").prop("readonly", true);
    $("#inputFechaNumBaj").prop("readonly", true);
    $("#inputFechaLetBaj").prop("readonly", true);
    $("#txtAobservaciones").prop("readonly", true);
}

function cargarDataTable(idBodyTable, idBody, jsonTableArray) {
    $(idBodyTable).empty();
    jsonTableArray.forEach(element => {
        $(idBody).append(
            '<tr>' +
            '<td>' + element.reason + '</td>' +
            '<td>' + formatoFecha(element.date1) + '</td>' +
            '<td>' + formatoFecha(element.date2) + '</td>' +
            '<td>' + element.job + '</td>' +
            '<td>' + element.basicSalary + '</td>' +
            '<td>' + element.bonus + '</td>' +
            '<td>' + element.compensation + '</td>' +
            '<td>' + element.quinquenniums + '</td>' +
            '<td>' + element.otherPerceptions + '</td>' +
            '<td>' + element.total + '</td>' +
            '</tr>');
    });
}


function actualizar() {
    $.ajax({
        url: "http://localhost:3000/inea/hojaunica/api/v1/hojaUnica/" + localStorage.getItem('_id'),
        dataType: "json",
        ContentType: "application/json;charset=utf-8",
        type: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify(
            {
                name: $("#inputNombres").val(),
                lastnameM: $("#inputApellidoM").val(),
                lastnameP: $("#inputApellidoP").val(),
                rfc: $("#inputRFC").val(),
                homoclave: $("#inputHomoclave").val(),
                address: $("#inputDireccion").val(),
                number: $("#inputNumero").val(),
                col: $("#inputColonia").val(),
                postalcode: $("#inputCP").val(),
                city: $("#inputCiudad").val(),
                state: $("#inputEstado").val(),
                dateIn: $("#inputFechaNumIn").val(),
                dateInW: $("#inputFechaLetIn").val(),
                dateOut: $("#inputFechaNumBaj").val(),
                dateOutW: $("#inputFechaLetBaj").val(),
                sectionFin: secFin,
                observations: $("#txtAobservaciones").val()
            }
        )
    }).done(function (data) {
        console.log('se actualizo correctamente');
        cancelar();
    })
        .fail(function (data) { console.log('No se actualizo'); });
}

function detallesSecFin() {
    cargarDataTable("#tblBodyModalD", "#tblModalD", secFin);
}

function AgregarSecFin() {
    let objeto = {
        "reason": $('#inputMotivo').val(),
        "date1": $('#inputPeriodoDel').val(),
        "date2": $('#inputPeriodoAl').val(),
        "job": $('#inputPuesto').val(),
        "basicSalary": $('#inputSueldo').val(),
        "bonus": $('#inputSobresueldo').val(),
        "compensation": $('#inputCompen').val(),
        "quinquenniums": $('#inputQuinque').val(),
        "otherPerceptions": $('#inputOtras').val(),
        "total": $('#inputTotal').val()
    };
    secFin.push(objeto);
    cargarDataTable("#tblBodyModal", "#tblModal", secFin);
    limpiarForm();
}

function limpiarForm() {
    $('#inputMotivo').val("");
    $('#inputPeriodoDel').val("");
    $('#inputPeriodoAl').val("");
    $('#inputPuesto').val("");
    $('#inputSueldo').val("");
    $('#inputSobresueldo').val("");
    $('#inputCompen').val("");
    $('#inputQuinque').val("");
    $('#inputOtras').val("");
    $('#inputTotal').val("");
    $('#inputMotivo').val("");
    $('#inputPeriodoDelA').val("");
    $('#inputPeriodoAlA').val("");
    $('#inputPuestoA').val("");
    $('#inputSueldoA').val("");
    $('#inputSobresueldoA').val("");
    $('#inputCompenA').val("");
    $('#inputQuinqueA').val("");
    $('#inputOtrasA').val("");
    $('#inputTotalA').val("");
}

function salirModal() {
    limpiarForm();
    jsonTable = [];
    $("#tblBodyModal").empty();
}

function guardarDataModal() {
    cargarDataTable("#tblBody", "#tblResumenSec3", secFin);
    limpiarForm();
    secFin = jsonTable;
    jsonTable = [];
    $("#tblBodyModal").empty();
}

function editRegSecFin(id) {
    $('#inputMotivoA').val(secFin[id].reason);
    $('#inputPeriodoDelA').val(formatoFechaAmericano(secFin[id].date1));
    $('#inputPeriodoAlA').val(formatoFechaAmericano(secFin[id].date2));
    $('#inputPuestoA').val(secFin[id].job);
    $('#inputSueldoA').val(secFin[id].basicSalary);
    $('#inputSobresueldoA').val(secFin[id].bonus);
    $('#inputCompenA').val(secFin[id].compensation);
    $('#inputQuinqueA').val(secFin[id].quinquenniums);
    $('#inputOtrasA').val(secFin[id].otherPerceptions);
    $('#inputTotalA').val(secFin[id].total);
    $('#inputMotivoA').prop("readonly", false);
    $('#inputPeriodoDelA').prop("readonly", false);
    $('#inputPeriodoAlA').prop("readonly", false);
    $('#inputPuestoA').prop("readonly", false);
    $('#inputSueldoA').prop("readonly", false);
    $('#inputSobresueldoA').prop("readonly", false);
    $('#inputCompenA').prop("readonly", false);
    $('#inputQuinqueA').prop("readonly", false);
    $('#inputOtrasA').prop("readonly", false);
    localStorage.setItem("_idReg", id);
}

function cancelEditRegSecFin() {
    $('#inputMotivoA').val("");
    $('#inputPeriodoDelA').val("");
    $('#inputPeriodoAlA').val("");
    $('#inputPuestoA').val("");
    $('#inputSueldoA').val("");
    $('#inputSobresueldoA').val("");
    $('#inputCompenA').val("");
    $('#inputQuinqueA').val("");
    $('#inputOtrasA').val("");
    $('#inputTotalA').val("");
    $('#inputMotivoA').prop("readonly", true);
    $('#inputPeriodoDelA').prop("readonly", true);
    $('#inputPeriodoAlA').prop("readonly", true);
    $('#inputPuestoA').prop("readonly", true);
    $('#inputSueldoA').prop("readonly", true);
    $('#inputSobresueldoA').prop("readonly", true);
    $('#inputCompenA').prop("readonly", true);
    $('#inputQuinqueA').prop("readonly", true);
    $('#inputOtrasA').prop("readonly", true);
    localStorage.removeItem("_idReg");
}

function guardarRegSecFin() {
    let id = localStorage.getItem("_idReg");
    secFin[id].reason = $('#inputMotivoA').val();
    secFin[id].date1 = $('#inputPeriodoDelA').val();
    secFin[id].date2 = $('#inputPeriodoAlA').val();
    secFin[id].job = $('#inputPuestoA').val();
    secFin[id].basicSalary = $('#inputSueldoA').val();
    secFin[id].bonus = $('#inputSobresueldoA').val();
    secFin[id].compensation = $('#inputCompenA').val();
    secFin[id].quinquenniums = $('#inputQuinqueA').val();
    secFin[id].otherPerceptions = $('#inputOtrasA').val();
    secFin[id].total = $('#inputTotalA').val();
    localStorage.removeItem("_idReg");
    cargarDataTableEditable("#tblBodyModalA", "#tblModalA", secFin);
    cargarDataTable("#tblBody", "#tblResumenSec3", secFin);
    cancelEditRegSecFin();
}

function cargarDataTableEditable(idBodyTable, idBody, jsonTableArray) {
    $(idBodyTable).empty();
    let id = 0;
    jsonTableArray.forEach(element => {
        $(idBody).append(
            '<tr>' +
            '<td>' + element.reason + '</td>' +
            '<td>' + formatoFecha(element.date1) + '</td>' +
            '<td>' + formatoFecha(element.date2) + '</td>' +
            '<td>' + element.job + '</td>' +
            '<td>' + element.basicSalary + '</td>' +
            '<td>' + element.bonus + '</td>' +
            '<td>' + element.compensation + '</td>' +
            '<td>' + element.quinquenniums + '</td>' +
            '<td>' + element.otherPerceptions + '</td>' +
            '<td>' + element.total + '</td>' +
            '<td>' + "<button type='button' class='btn btn-outline-light btn-sm' onclick='editRegSecFin(\"" + id + "\")'><img class='glyphicon-object-align-vertical'src='../Recursos/pencil.svg'/></button>" + '</td>' +
            '</tr>');
        id++;
    }
    );
}

function formatoFechaEscrito(date) {
    let f = new Date(date.replace(/-/g, '\/').replace(/T.+/, ''));
    return f.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function formatoFecha(date) {
    let f = new Date(date.replace(/-/g, '\/').replace(/T.+/, ''));
    let fecha = `${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`;
    return fecha;
}

function formatoFechaAmericano(date) {
    return date.replace(/T.+/, '');
}

function cargarFechaEscrita(campo, campofecha) {
    $("#" + campo).val(formatoFechaEscrito($("#" + campofecha).val()));
}

function cargarTotal(campoTotal,campoS, campoSs, campoC, campoQ, campOo) {
    $("#"+campoTotal).val(parseFloat($("#"+campoS).val())+parseFloat($("#"+campoSs).val())+parseFloat($("#"+campoC).val())+parseFloat($("#"+campoQ).val())+parseFloat($("#"+campOo).val()));
}

function guardarHojaU() {
    $.ajax({
        url: "http://localhost:3000/inea/hojaunica/api/v1/hojaUnica",
        dataType: "json",
        ContentType: "application/json;charset=utf-8",
        type: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify(
            {
                name: $("#inputNombres").val(),
                lastnameM: $("#inputApellidoM").val(),
                lastnameP: $("#inputApellidoP").val(),
                rfc: $("#inputRFC").val(),
                homoclave: $("#inputHomoclave").val(),
                address: $("#inputDireccion").val(),
                number: $("#inputNumero").val(),
                col: $("#inputColonia").val(),
                postalcode: $("#inputCP").val(),
                city: $("#inputCiudad").val(),
                state: $("#inputEstado").val(),
                dateIn: $("#inputFechaNumIn").val(),
                dateInW: $("#inputFechaLetIn").val(),
                dateOut: $("#inputFechaNumBaj").val(),
                dateOutW: $("#inputFechaLetBaj").val(),
                sectionFin: secFin,
                observations: $("#txtAobservaciones").val()
            }
        )
    }).done(function (data) {
        console.log('se guardo correctamente');
        $("#inputNombres").val("");
        $("#inputApellidoM").val("");
        $("#inputApellidoP").val("");
        $("#inputRFC").val("");
        $("#inputHomoclave").val("");
        $("#inputDireccion").val("");
        $("#inputNumero").val("");
        $("#inputColonia").val("");
        $("#inputCP").val("");
        $("#inputCiudad").val("");
        $("#inputEstado").val("");
        $("#inputFechaNumIn").val("");
        $("#inputFechaLetIn").val("");
        $("#inputFechaNumBaj").val("");
        $("#inputFechaLetBaj").val("");
        secFin = [];
        jsonTable = [];
        $("#tblBody").empty();
        $("#txtAobservaciones").val("");
    })
        .fail(function (data) { console.log('No se guardo'); });
}