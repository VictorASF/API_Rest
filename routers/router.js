const express = require('express')
const router = express.Router()
const routerGames = require('./games/GamesController')
const routerUsers = require('./users/UsersController')


//const routerGames = require('./games/GamesController')

router.use('/', routerGames, routerUsers)


router.get('/',(req,res)=>{
    res.send('OK')
})

module.exports = router