const Booking = require('../models/Booking')

module.exports = {
    async store(req, res){
        const { user_id } = req.headers
        const { spot_id } = req.params
        const { date } = req.body

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        })
        
        await booking.populate('spot').populate('user').execPopulate()

        //procurando o dono do spot
        const ownerSocket = req.connectedUsers[booking.spot.user]

        //se existir uma conexão com esse id enviar uma mensagem
        //passando todo o objeto booking
        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.json(booking)

    }
}