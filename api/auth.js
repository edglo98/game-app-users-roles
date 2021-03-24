const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { generarJWT } = require('./helpers/JWT')
const { runQuery } = require('./sqlConnection')
const { validarJWT } = require('./helpers/validarJWT')
const { validarResultados } = require('./helpers/validarCampos')

/*
 [
  check('email', 'El email debe ser un correo valido').isEmail().not().isEmpty(),
  check('password', 'La contraseña es obligatoría. Debe ser minimo de 8 caracteres. Tiene que tener un caracter especial. Tiene que tener un número').exists().isStrongPassword({minUppercase : 1, minSymbols : 1, minNumbers : 1}).isLength({ min : 8}).not().isEmpty(),
  validarResultados,
],
*/
router.post('/', [
  check('email', 'El email debe ser un correo valido').isEmail().not().isEmpty(),
  check('password', 'La contraseña es obligatoría. Debe ser minimo de 8 caracteres. Tiene que tener un caracter especial. Tiene que tener un número').exists().isStrongPassword({ minUppercase: 1, minSymbols: 1, minNumbers: 1 }).isLength({ min: 8 }).not().isEmpty(),
  validarResultados
], async (req, res, next) => {
  const { email, password } = req.body
  try {
    const { rowsAffected, recordset } = await runQuery(`Select * from administradores where correo = '${email}' and password = '${password}'`)
    if (rowsAffected[0] > 0) {
      const { idAdrministrador } = recordset[0]
      const token = await generarJWT(idAdrministrador)
      return res.status(200).json({
        ok: true,
        msg: recordset[0],
        token
      })
    }

    return res.status(400).json({
      ok: false,
      msg: 'Usuario no encontrado'
    })
  } catch (error) {
    res.status(400).json({
      ok: 'false',
      msg: 'Contactarse con el administrador',
      error
    })
  }
})

router.get('/newLogin', validarJWT, async (req, res) => {
  const id = req.id

  const token = await generarJWT(id)

  const { recordset } = await runQuery(`Select * from administradores where idAdrministrador = ${id}`)

  res.json({
    ok: true,
    msg: {
      data: recordset[0],
      token
    }
  })
})

module.exports = router
