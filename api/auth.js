const { Router } = require('express');
const router = Router();
const { generarJWT } = require('./helpers/JWT');
const { runQuery } = require('./sqlConnection');
const { validarJWT } = require('./helpers/validarJWT');

router.post('/', async ( req, res, next ) => {

  const {	email, password } = req.body;
  try {
      const { rowsAffected, recordset } = await runQuery(`Select * from administradores where correo = '${email}' and password = '${password}'`);
      if(rowsAffected[0] > 0){
          const { idAdrministrador } = recordset[0];
          const token = await generarJWT( idAdrministrador );
          return res.status(200).json({
              ok  : true,
              msg : {
                  data : recordset[0],
                  token
              }
          });
      }

      return res.status(400).json({
          ok : false,
          msg : 'Usuario no encontrado'
      });

  } catch (error) {
      res.status(400).json({
          ok : 'false',
          msg : 'Contactarse con el administrador',
          error
      });
  }

});

router.get('/newLogin', validarJWT, async(req, res = response) => {

  const id = req.id;

  const token = await generarJWT( id );

  const { recordset } = await runQuery(`Select * from administradores where idAdrministrador = ${id}`);


  res.json({
      ok: true,
      msg : {
          data : recordset[0],
          token
      }
  });
})




module.exports = router;
