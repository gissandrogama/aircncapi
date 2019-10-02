const express = require ('express')

const app = express()

// req.query = acessar query params (para filtro)
// req.params = acessar route params (para edição e delete)
// req.body = acessar corpo da requisição (para criação e edição)

app.use(express.json())

app.post('/users', (req, res) => {
    return res.json(req.body)
})

app.listen(3333)