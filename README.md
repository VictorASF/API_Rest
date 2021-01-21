# API de Games 
API feita em Javascript com uso dos pacotes Express, Sequelize e Cors

## Endpoints
### GET /games
Endpoint responsavel por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso esta resposta aconteça você receberá a listagem de todos os games cadastrados
##### Falha na autenticação! 401
Ocorreu um falha no processo de autenticação. Motivos: Token invalido ou Token expirado



##### OBS
json de login usado na rota authenticate:
'''
{
    "email":"victor@teste.com.br",
    "password":"senhasecreta"
}
'''
