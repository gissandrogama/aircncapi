//index, show, store, update, destroy
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email } = req.body

        // variavel pode ser alterada
        //busca por id 
        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ email })
        }

        return res.json(user)
    }

}