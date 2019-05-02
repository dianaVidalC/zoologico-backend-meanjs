'use strict'

//Creación del servidor web

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Cargar rutas

const user_routes = require('./routes/user');

//Middlewares de body-parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configurar cabeceras y cors

//rutas base
app.use('/api', user_routes);
// app.use('/api', user_routes);

module.exports = app;


