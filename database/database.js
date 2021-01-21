const Sequelize = require('sequelize')

var user = '******'
var password = '******'

const connection = new Sequelize('gamestop', user, password,{
    host:'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection