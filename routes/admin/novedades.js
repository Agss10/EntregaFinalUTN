var express = require('express');
var router = express.Router();
var novedadesModels = require('../../models/novedadesModels');



/*GET novedades page */
router.get('/', async function (req, res, next) {

    var novedades = await novedadesModels.getNovedades();

    res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
    });
});

/*ELIMINAR UNA NOVEDAD*/
router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await novedadesModels.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});

router.get('/eliminar', (req, res, next) => {
    res.render('admin/eliminar', {
        layout: 'admin/layout'
    });
});
/*ELIMINAR UNA NOVEDAD*/

/*AGREGAR UNA NOVEDAD*/
router.post('/agregar', async (req, res, next) => {
    try {
        
        if (req.body.titulo != "" && req.body.subitutlo != "" && req.body.cuerpo != "") {
            await novedadesModels.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo la novedad'

        })
    }
})




router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout'
    });
});
/*AGREGAR UNA NOVEDAD*/

/*MODIFICAR UNA NOVEDAD Y QUE MEUSTRE EN EL LISTADO*/
router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModels.getNovedadesById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});
/*MODIFICAR UNA NOVEDAD*/
router.post('/modificar', async(req, res , next) => {
    try{
        var obj =   {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }
    console.log(obj)
    await novedadesModels.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error)
        res.render('admin/modificar',   {
            layout: 'admin/modificar',
            error: true,
            message: 'No se modifico la novedad'
        })
    }
});





module.exports = router;