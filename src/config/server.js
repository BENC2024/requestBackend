
//modulo de express
const express = require("express");
const session = require('express-session');
const cors = require("cors");
require('dotenv').config();

const app = express() //Se traen las funciones de express

app.use(express.json()) //Solamente utilizar el formato json
app.use(express.urlencoded({ extended: true }));
app.use(cors()) // Uso de enlace cruzado

// Configuración de express-session
app.use(session({
   secret: process.env.JWT_SECRET, // Secreto para la sesión
   resave: false,
   saveUninitialized: true})
)

const categoryRoutes = require("../routes/category.route.js")
const companyRoutes = require("../routes/company.route.js")
const requestRoutes = require("../routes/request.route.js")
const thirdPartiesRoutes = require("../routes/thirdParties.route.js")
const userRoutes = require("../routes/user.route.js")
//const loginRoutes = require("../routes/login.routes.js");

app.use(categoryRoutes)
app.use(companyRoutes)
app.use(requestRoutes)
app.use(thirdPartiesRoutes)
app.use(userRoutes)
//app.use(loginRoutes)

app.set("puerto", process.env.PORT) 

module.exports = app
