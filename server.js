const express = require("express");
const wagner = require("wagner-core");
const bodyParser = require('body-parser');
var config = require("./_config");
var cors = require('cors');
require("./models/models")(wagner);
const users = require("./routers/user.router.js")(wagner);
const hojaU = require("./routers/hojaU.router.js")(wagner);
let app = express();
app.use(cors());
app.use(bodyParser({ limit: 1024102420, extended: false }));
app.use(bodyParser.json({ limit: 1024102420, type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false, limit: 1024102420, parameterLimit: 50000 }));


app.use(config.root + 'usuarios', users);
app.use(config.root + 'hojaUnica', hojaU);
module.exports = app;