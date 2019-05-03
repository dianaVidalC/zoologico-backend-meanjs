'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_del_curso_de_meanjs';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación.' })
    } else {
        //recoge la cabecera de autenticación
        const token = req.headers.authorization.replace(/['"]+/g, '');
        console.log(token);
        console.log('/////////////');

        try {
            const payload = jwt.decode(token, secret);
            console.log(payload);

            console.log(payload.exp);
            console.log(moment().unix());

            if ((payload.exp <= moment().unix())) {
                return res.status(401).send({ message: 'El token ha expirado.' });
            }
        } catch (err) {
            return res.status(404).send({ message: 'El token no es válido.' });
        }

        req.user = payload;
        next();
    }
};