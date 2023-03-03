const {Router} = require('express')
const { check } = require('express-validator')
const { CrearActividad } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()


router.post('/new',[

    check('cuenta', "La cuenta es obligatorio").isNumeric(),
    check('monto', "El monto es obligatorio").isNumeric(),
    check('status', "El status es obligatorio").isString(),
    check('descripcion', "El descripcion es obligatorio").isString(),
    validarCampos

],CrearActividad)



module.exports = router