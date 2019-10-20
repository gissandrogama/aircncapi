const express = require ('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const app = express()
const server = http.Server(app)
const io = socketio(server)


mongoose.connect('mongodb://localhost:27017/aircncapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//lista de usuários conectados socket
const connectedUsers = {}

//conexão como o usuários
io.on('connection', socket => {

    const { user_id } = socket.handshake.query
    //relacionando o id do usuário com o id do socket
    connectedUsers[user_id] = socket.id

})

//add funcionalidade em toda a rota, deixar a variável connectedUsers disponivel para toda a aplicação
app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next
})

// req.query = acessar query params (para filtro)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads' )))
app.use(routes)

server.listen(3333)