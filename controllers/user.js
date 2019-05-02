'user strict'
//modulos
const bcrypt = require('bcrypt-nodejs');

//Modelos
const User = require('../models/user');

//acciones

function saveUser(req, res) {

    //Crear objeto de usuario
    const user = new User();

    //Recoger parámetros petición
    const params = req.body;
    console.log(params);

    //Asignar valores
    if (params.password && params.name && params.surname && params.email) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({ email: user.email.toLowerCase() }, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al comprobar usuario.'
                })
            } else {
                if (!data) {
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        //Guardar usuario en bd
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    message: 'Error al guardar usuario.'
                                });
                            } else {
                                if (!userStored) {
                                    res.status(400).send({
                                        message: 'No se ha registrado el usuario.'
                                    });
                                } else {
                                    res.status(200).send({
                                        user: userStored
                                    });
                                }
                            }
                        })
                    })
                } else {
                    res.status(200).send({
                        message: 'El usuario no puede registrarse porque ya existe en la base de datos.'
                    })
                }
            }
        })
    } else {
        res.status(200).send({
            message: 'Introduzca los datos correctamente para poder registrar usuario.'
        })
    }
}

function login(req, res) {
    const params = req.body;
    const email = params.email;
    const password = params.password;

    if (email && password) {
        User.findOne({ email: email.toLowerCase() }, function (err, userlogin) {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar usuario.' });
            } else {
                if (userlogin) {
                    bcrypt.compare(password, userlogin.password, (err, check) => {
                        if (check) {
                            res.status(200).send({ userlogin });
                        } else {
                            res.status(404).send({ message: 'Contraseña incorrecta.' })
                        }
                    })
                } else {
                    res.status(404).send({ message: 'El usuario no ha podido iniciar sesión.' })
                }
            }
        })
    } else {
        res.status(200).send({
            message: 'Introduzca los datos correctamente.'
        })
    }
}
module.exports = {
    saveUser,
    login
}