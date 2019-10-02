const express = require ('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/aircncapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// req.query = acessar query params (para filtro)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.use(express.json())
app.use(routes)

app.listen(3333)