const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.get('/all', md_auth.ensureAuth, UserController.all);
module.exports = api;