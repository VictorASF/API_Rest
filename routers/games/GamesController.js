const express = require('express')
const routerGames = express.Router()
const Games = require('./Games')
const auth = require('../../middleware/auth')

routerGames.get('/games', auth, (req,res)=>{

    var user = req.user
    Games.findAll().then(games=>{
        
        res.statusCode = 200
        res.send({user: user,games:games})
    })
})

routerGames.get('/games/:id', auth, (req,res)=>{
   
    var id = req.params.id

    var hateoas = [
        {
            href: `http://localhost:3000/games/${id}`,
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: `http://localhost:3000/games`,
            method: 'GET',
            rel: "get_game"
        },
        {
            href: 'http://localhost:3000/authenticate',
            method: "POST",
            rel: 'login'
        }
    ]

    if(isNaN(id)){
        res.statusCode = 400
        res.send('Id Invalido, favor inserir o id em formato numerico')
    }else{
        Games.findByPk(id).then(game=>{
            if(game){
                console.log(game)
                res.statusCode = 200
                res.send({game: game, _links: hateoas})
            }else{
                res.statusCode = 404
                res.send('Id inexistente')
            }
        })
    }

    
})

routerGames.post('/game', auth, (req,res)=>{
    var title = req.body.title
    var year = req.body.year
    var price = req.body.price

    if(!title || !isNaN(title)){
        res.statusCode = 400
        res.send("Titulo Invalido, favor inserir um valor textual correto")
    }else if(!year || isNaN(year)){
        res.statusCode = 400
        res.send("Ano Invalido, favor inserir um valor numerico correto")
    }else if(!price || isNaN(price)){
        res.statusCode = 400
        res.send("Ano Invalido, favor inserir um valor numerico correto")
    }else{
        Games.create({
            title: title,
            year: year,
            price: price
        }).then(()=>{
            res.statusCode = 200
            res.redirect('/games')
        })
    }
})

routerGames.delete('/game/:id', auth, (req,res)=>{
    var id = req.params.id
    if(isNaN(id)){
        res.statusCode = 400
        res.send('Id Invalido, favor inserir o id em formato numerico')
    }else{
        Games.findByPk(id).then(game=>{
            if(game){
                Games.destroy({where:{id:id}}).then(()=>{
                    res.statusCode = 200 
                    res.redirect('/games') 
                })
            }else{
                res.statusCode = 400
                res.send('Id inexistente favor utilizar um id valido para deletar')
            }
        })
        
    }
})

routerGames.put('/game/:id', auth, (req,res)=>{
    var id = req.params.id

    var{title, year, price} = req.body

    if(isNaN(id)){
        res.statusCode = 400
        res.send('Id Invalido, favor inserir o id em formato numerico')
    }else{
        if(!title || !isNaN(title)){
            res.statusCode = 400
            res.send("Titulo Invalido, favor inserir um valor textual correto")
        }else if(!year || isNaN(year)){
            res.statusCode = 400
            res.send("Ano Invalido, favor inserir um valor numerico correto")
        }else if(!price || isNaN(price)){
            res.statusCode = 400
            res.send("Ano Invalido, favor inserir um valor numerico correto")
        }else{
            Games.findByPk(id).then(game=>{
                if(game){
                    Games.update({
                        title:title,
                        year:year,
                        price:price
                    },{where:{id:id}}).then(()=>{
                        res.statusCode=200
                        res.redirect('/games')
                    })
                }else{
                    res.statusCode = 404
                    res.send('Id inexistente')
                }
            })
        }
    }
})

module.exports = routerGames