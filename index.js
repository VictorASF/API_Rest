const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const router = require('./routers/router')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

connection
    .authenticate()
    .then(()=>{
        console.log('Connected')
    }).catch((error)=>{
        console.log(error)
    })

app.use('/',router)

app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})