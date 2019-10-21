const Booking = require('../models/Booking')

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params

        const booking = await Booking.findById(booking_id).populate('spot')

        booking.approved = true;

        await booking.save()

         //procurando o dono do spot
         const bookingUserSocket = req.connectedUsers[booking.user]

         //se existir uma conexão com esse id enviar uma mensagem
         //passando todo o objeto booking
         if(bookingUserSocket){
             req.io.to(bookingUserSocket).emit('booking_response', booking)
         }

        return res.json(booking)
    }
}