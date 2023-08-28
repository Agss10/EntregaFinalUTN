const pool = require('./bd');

/*sirve para enlistar novedades*/
async function getNovedades()   {
    var query = 'select * from novedades';
    var rows = await pool.queury(query);
    return rows;
}

/*sirve para eliminar novedades*/
async function deleteNovedadesById(id)  {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}



module.exports =    {getNovedades, deleteNovedadesById};