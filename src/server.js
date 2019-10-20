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

//conexão como o usuários
io.on('connection', socket => {
    console.log(socket.handshake.query)
    console.log('Usuário conectado', socket.id)

})

mongoose.connect('mongodb://localhost:27017/aircncapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// req.query = acessar query params (para filtro)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads' )))
app.use(routes)

server.listen(3333)