'use strict'
//conexión a la base de datos

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/zoo', {
    useNewUrlParser: true
}, (err, res) => {
    if (err) {
        throw err;
    } else {
        app.listen(port, () => {
            console.log('El servidor local con node y express, está corriendo correctamente...');
            
        })
        console.log('La conexión a la base de datos zoo se ha realizado correctamente...');
    }
})