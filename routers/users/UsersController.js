const express = require('express')
const routerUsers = express.Router()
const Users = require('./Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const secret = require("../../middleware/pass")

routerUsers.get('/users', auth,(req,res)=>{
    Users.findAll().then(users=>{
        res.statusCode = 200
        res.send(users)
    })
})

routerUsers.post('/users', auth,(req,res)=>{
    var {name, email, password} = req.body
    Users.findOne({where:{email:email}}).then(user=>{
        if(user==undefined){
            if(name!=undefined && password!=undefined){
                password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                Users.create({
                    name:name,
                    email:email,
                    password: password
                }).then(()=>{
                    res.sendStatus(200)
                }).catch(error=>{
                    res.sendStatus(500)
                    console.log(error)})
            }else{
                res.statusCode=400
            }
        }else{
            res.statusCode=400
        }
    })
})

routerUsers.post('/authenticate',(req,res)=>{
    var {email,password} = req.body

    if(email == undefined){
        res.sendStatus(404)
    }else{
    Users.findOne({where:{email:email}}).then(user=>{
        console.log(user)
        if(user){
            var correct = bcrypt.compareSync(password,user.password)

            if(correct){
                jwt.sign({id: user.id,email: user.email},secret,{expiresIn:'1h'},(err,token)=>{
                    if(err){
                        res.statusCode = 400
                        res.json({err:"Falha interna"})
                    }else{
                        res.statusCode = 200
                        res.json({token:token})
                    }
                })
            }else{
                res.sendStatus(400)
                res.send('Usuario ou senha incorretos')
            }
        }else{
            res.sendStatus(404)
            res.send('Usuario ou senha incorretos')
        }
    })
}
})
 

module.exports = routerUsers