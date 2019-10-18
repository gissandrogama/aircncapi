const multer = require('multer')
const path = require('path')

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)
            const name_number = name.replace(/[^\d]+/g,'')                                   

            cb(null, `${name_number}-${Date.now()}${ext}`)
        }
    })
}