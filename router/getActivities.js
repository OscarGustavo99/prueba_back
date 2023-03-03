const { Router } = require('express')
const { getActivities } = require('../controllers/getActivities')


const router = Router()


router.get('/actv', getActivities)

// Nota en devolver Router es asi de esta manera
module.exports = router
