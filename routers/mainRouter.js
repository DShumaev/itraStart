const { Router } = require('express')
const Controller = require('../conntrollers/controller')


const router = Router()
router.get('/hello', Controller.sendHelloMessage)


module.exports = router