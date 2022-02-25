const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "./image")
        // ini config untuk menentukan folder penyimpanan file yg diupload
    },
    filename: (request, file, callback) => {
        callback(null, `image-${Date.now()}${path.extname(file.originalname)}`)
        // ini config untuk menentukan nama file yang diupload
    }
})

exports.upload = multer({storage: storage})