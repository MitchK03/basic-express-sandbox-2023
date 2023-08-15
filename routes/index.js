const router = require('express').Router()
const viewRoutes = require('./views')
const petsAPIRoutes = require('./pets')

router.use('/api', petsAPIRoutes)

router.use('/', viewRoutes)

module.exports = router