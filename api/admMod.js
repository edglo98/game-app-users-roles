const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { runQuery } = require('./sqlConnection.js')
const { validarJWT } = require('./helpers/validarJWT')
const { validarResultados } = require('./helpers/validarCampos')
const { comprobarJWT } = require('./helpers/JWT.js')

const validaciones = [
  check('idm', 'El id del modulo es obligatorio es obligatorio').not().isEmpty(),
  check('ida', 'id del modulo del admin es obligatorio').not().isEmpty(),
  check('estado', 'El estado es obligatorio y solo puede ser 1 (true) o 0 (false)').not().isEmpty(),
  validarResultados,
  validarJWT

]
router.get('/', validarJWT, async (req, res, next) => {
  const { recordset } = await runQuery('select * from ModulosAdministradores')
  if (recordset.length > 0) {
    return res.status(200).json({
      ok: true,
      msg: recordset
    })
  }
  res.status(400).json({
    ok: false,
    msg: 'No se encontraron registros'
  })
})

router.get('/:id', validarJWT, async (req, res, next) => {
  const idA = req.params.id
  try {
    const { recordset } = await runQuery(`select * from ModulosAdministradores where idAdrministrador = ${idA}`)
    if (recordset.length > 0) {
      return res.status(200).json({
        ok: true,
        msg: recordset
      })
    }
    res.status(400).json({
      ok: false,
      msg: 'No se encontraron datos'
    })
  } catch (error) {
    res.status(400).json({
      ok : false,
      msg : 'Contactar con el administrador',
      error
    });
  }
})

router.post('/', validaciones, async (req, res, next) => {
  const { idm, ida, estado = 0 } = req.body
  try {
    const { rowsAffected } = await runQuery(`insert into ModulosAdministradores values (${idm}, ${ida}, ${estado})`)
    if (rowsAffected[0] > 0) {
      return res.status(200).json({
        ok: true,
        msg: 'Datos insertados correctamente'
      })
    }
    res.status(400).json({
      ok: false,
      msg: 'Datos no insertados'
    })
  } catch (error) {
    res.status(400).json({
      ok : false,
      msg : 'Contactar con el administrador',
      error
    });
  }
})

router.delete('/:id', comprobarJWT, async (req, res, next) => {
  const idA = req.params.id
  try {
    const { rowsAffected } = await runQuery(`delete from ModulosAdministradores where idAdrministrador = ${idA}`)
    if (rowsAffected[0] > 0) {
      return res.status(200).json({
        ok: true,
        msg: 'Datos borrados correctamente'
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

router.put('/:id', validaciones, async (req, res, next) => {
  const idA = req.params.id
  const { idm, estado = 0 } = req.body
  try {
    const { rowsAffected } = await runQuery(`update ModulosAdministradores set estado = ${estado} where idAdrministrador = ${idA} and IdModulo = ${idm} `)
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
      msg: 'Contectar con el administrador'
    })
  }
})

module.exports = router
