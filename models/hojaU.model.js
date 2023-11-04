const mongoose = require("mongoose");
let subDocument = new mongoose.Schema({
  reason: { type: String, required: true, maxlength: 50 }, //validar solo letras
  date1: { type: Date, required: true },
  date2: { type: Date, required: true },
  job: { type: String, required: true, maxlength: 50 }, //validar solo letras
  basicSalary: { type: String, required: true }, //validar solo numeros y punto
  bonus: { type: String, required: true }, //validar solo numeros y punto
  compensation: { type: String, required: true }, //validar solo numeros y punto
  quinquenniums: { type: String, required: true }, //validar solo numeros y punto
  otherPerceptions: { type: String, required: true }, //validar solo numeros y punto
  total: { type: String, required: true } //validar solo numeros y punto
});
let hojaUSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 }, //validar solo letras
  lastnameM: { type: String, required: true, maxlength: 50 }, //validar solo letras
  lastnameP: { type: String, required: true, maxlength: 50 }, //validar solo letras
  rfc: { type: String, required: true, maxlength: 10, minlength: 10 }, //validar solo numeros y letras
  homoclave: { type: String, required: true, maxlength: 3, minlength: 3 }, //validar solo numeros y letras
  address: { type: String, required: true, maxlength: 50 }, //validar solo numeros y letras
  number: { type: String, required: true, maxlength: 4 }, //validar solo numeros
  col: { type: String, required: true, maxlength: 50 }, //validar solo letras
  postalcode: { type: String, required: true, maxlength: 5 }, //validar solo numeros
  city: { type: String, required: true, maxlength: 50 }, //validar solo numeros y letras
  state: { type: String, required: true, maxlength: 50 }, //validar solo letras
  dateIn: { type: Date, required: true },
  dateInW: { type: String, required: true, maxlength: 50 }, //validar solo letras
  dateOut: { type: Date, required: true },
  dateOutW: { type: String, required: true, maxlength: 50 }, //validar solo letras
  sectionFin: [subDocument],
  observations: { type: String } //validar solo letras
});
const hojaUModel = mongoose.model("HojaU", hojaUSchema, "hojasU");
module.exports = hojaUModel;