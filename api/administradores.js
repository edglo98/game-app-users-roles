const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { runQuery } = require('./sqlConnection.js')
const { validarJWT } = require('./helpers/validarJWT')
const { validarResultados } = require('./helpers/validarCampos')

const validaciones = [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'El email debe ser un correo valido').isEmail().not().isEmpty(),
  check('password', 'La contraseña es obligatoría. Debe ser minimo de 8 caracteres. Tiene que tener un caracter especial. Tiene que tener un número').exists().isStrongPassword({ minUppercase: 1, minSymbols: 1, minNumbers: 1 }).isLength({ min: 8 }).not().isEmpty(),
  validarResultados,
  validarJWT

]

router.get('/', validarJWT, async( req, res, next ) => {
  const { recordset } = await runQuery(`select * from administradores where idAdrministrador <> 6`);
  if( recordset.length > 0 ){
    return res.status(200).json({
      ok: true,
      msg: recordset
    })
  }
  res.status(400).json({
    ok: false,
    msg: 'No se encontraron datos'
  })
})

router.get('/:id', validarJWT, async (req, res, next) => {
  const idAdministrador = req.params.id
  try {
    const { recordset } = await runQuery(`select * from administradores where idAdrministrador = ${idAdministrador}`)
    if (recordset.length > 0) {
      return res.status(200).json({
        ok: true,
        msg: recordset[0]
      })
    }

    res.status(400).json({
      ok: false,
      msg: 'No se encontraron datos'
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Contactar con un administrador'
    })
  }
})

router.post('/', validaciones, async (req, res, next) => {
  const { nombre, correo, password } = req.body
  try {
    const { rowsAffected } = await runQuery(`select * from administradores where correo = '${correo}'`)
    if (rowsAffected[0] > 0) {
      return res.status(400).json({
        ok: false,
        msg: `El correo : '${correo}' ya se encuentra en uso`
      })
    }

    const data = await runQuery(`insert into administradores output inserted.idadrministrador values ('${nombre}', '${correo}', '${password}')`)
    console.log('wuu')
    if (data.recordset[0].idadrministrador > 0) {
      return res.status(200).json({
        ok: true,
        msg: 'Datos registrados',
        id: data.recordset[0].idadrministrador
      })
    }
    res.status(400).json({
      ok: false,
      msg: 'Datos no agregados'
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Contactar con el administrador',
      error
    })
  }
})

router.put('/:id', validaciones, async (req, res, next) => {
  const idAdministrador = req.params.id
  const { nombre, correo, password } = req.body
  try {
    const { recordset } = await runQuery(`select * from administradores where correo = '${correo}'`)

    if (recordset.length > 0 && recordset[0].idAdrministrador !== idAdministrador) {
      return res.status(400).json({
        ok: false,
        msg: `El correo : '${correo}' ya se encuentra en uso`
      })
    }

    const { rowsAffected } = await runQuery(`update administradores set Nombre = '${nombre}', Correo = '${correo}', Password = '${password}' where idAdrministrador = ${idAdministrador} `)
    if (rowsAffected[0] > 0) {
      return res.status(200).json({
        ok: true,
        msg: 'Datos actualizados correctamente'
      })
    }
    res.status(400).json({
      ok: false,
      msg: 'Datos no actualizados'
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Contactar con el administrador'
    })
  }
})

router.delete('/:id', validarJWT, async (req, res, next) => {
  const idAdministrador = req.params.id

  try {
    const { rowsAffected } = await runQuery(`delete from administradores where idAdrministrador = ${idAdministrador}`)
    if (rowsAffected[0] > 0) {
      return res.status(200).json({
        ok: true,
        msg: 'Datos borrados correctamnente'
      })
    }
    res.status(400).json({
      ok: false,
      msg: 'Datos no borrados'
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Contactar con el administrador'
    })
  }
})

module.exports = router
