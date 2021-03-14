const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { runQuery } = require('./sqlConnection');
const { validarJWT } = require('./helpers/validarJWT');
const { validarResultados } = require('./helpers/validarCampos');


const validaciones = [
  check('nombreMod','El nombre es obligatorio').not().isEmpty(),
  validarResultados,
  validarJWT

];

router.get('/', validarJWT,async (req, res, next) => {

  const { recordset } = await runQuery(`select * from modulos`);
  if(recordset.length > 0 ){
    return res.status(200).json({
      ok : true,
      msg : recordset
    });
  }

  res.status(400).json({
    ok : false,
    msg : 'No hay registros disponibles'
  });

});

router.get('/:id', validarJWT, async ( req, res, next ) => {

  const idModulo = req.params.id;

  try {
    const { recordset } = await runQuery(`select * from modulos where IdModulo = ${idModulo}`);
    if(recordset.length > 0 ){
      return res.status(200).json({
        ok : true,
        msg : recordset
      });
    }

    res.status(400).json({
      ok : false,
      msg : 'No hay registros disponibles'
    });

  } catch (error) {
    res.status(400).json({
      ok : false,
      msg : 'Contactar con un administrador'
    });
  }
});

router.post('/', validaciones, async( req, res, next) => {

  const { nombreMod } = req.body;

  try {

    const { rowsAffected } = await runQuery(`insert into modulos values ('${nombreMod}')`);
    console.log(rowsAffected[0])
    if( rowsAffected[0] > 0 ){
      return res.status(200).json({
        ok : true,
        msg : 'Datos agregados correctamente!'
      });
    }
    res.status(400).json({
      ok : false,
      msg : 'Dato no registrado'
    });

  } catch (error) {
    res.status(400).json({
      ok : false,
      msg : error
    });
  }

});

router.put('/:id', validaciones, async( req, res, next) => {
  const idModulo = req.params.id;
  const { nombreMod } = req.body;

  try {
    const { rowsAffected } = await runQuery(`update modulos set NombreMod = '${nombreMod}' where idmodulo = ${idModulo}`);
    if( rowsAffected[0] > 0){
      return res.status(200).json({
        ok : true,
        msg : 'Dato actualizado correctamente!'
      });
    }

    res.status(400).json({
      ok : false,
      msg : 'Dato no actualizados'
    });

  } catch (error) {
    res.status(400).json({
      ok : false,
      msg : error
    });
  }
});

router.delete('/:id', validarJWT, async( req, res, next) => {
  const idModulo = req.params.id;

  try {
    const { rowsAffected } = await runQuery(`delete from modulos where idModulo = ${idModulo}`);
    if( rowsAffected[0] > 0){
      return res.status(200).json({
        ok : true,
        msg : 'Datos borrados correctamente'
      });
    }

    res.status(200).json({
      ok : false,
      msg : 'Datos no borrados'
    });

  } catch (error) {
    res.status(400).json({
      ok : false,
      msg : error
    });
  }
});

module.exports = router;
