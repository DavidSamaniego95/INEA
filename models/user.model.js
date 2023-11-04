const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },  //validar solo letras
    lastname: { type: String, required: true, maxlength: 100 }, //validar solo letras
    idworker: { type: String, required: true, maxlength: 4 }, //validar solo numeros
    job: { type: String, required: true, maxlength: 1 }, //validar solo numeros
    user: { type: String, required: true, maxlength: 10 }, //validar solo letras  y numeros sin espacios
    pass: { type: String, required: true, maxlength: 10, minlength: 4 }, //validar solo letras  y numeros sin espacios
    permissions: { type: String, required: true, maxlength: 1 }, //validar solo numeros
    activeSession: { type: Boolean, default: false } // esto es para la sesión única del usuario
});
const userModel = mongoose.model("User", userSchema, "users");
module.exports = userModel;
