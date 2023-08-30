var express = require('express');
var router = express.Router();
var usuariosModels = require('./../../models/usuariosModels');

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        var usuario = req.body.usuario;
        var password = req.body.password;

        console.log(req.body);

        var data = await usuariosModels.getUserAndPassword
            (usuario, password);

        if (data != undefined) {
            req.session.nombre_usuario = data.nombre;
            req.session.nombre = data.usuario;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            })
        } //cierra else
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;