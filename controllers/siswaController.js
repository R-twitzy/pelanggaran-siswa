// memanggil file model untuk siswa
let modelSiswa = require("../models/index").siswa

let path = require("path")
let fs = require("fs")

exports.getDataSiswa = (request, response) => {
    modelSiswa.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.addDataSiswa = (request, response) => {
    if(!request.file){
        return response.json({
            messgae: `Tidak ada yg diupload`
        })
    }
    // tampung data request
    let newSiswa = {
        nama: request.body.nama,
        kelas: request.body.kelas,
        poin: request.body.poin,
        nis: request.body.nis,
        image: request.file.filename
    }

    modelSiswa.create(newSiswa)
        .then(result => {
            return response.json({
                message: `Data siswa berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

exports.editDataSiswa = async (request, response) => {
    let id = request.params.id_siswa
    let dataSiswa = {
        nama: request.body.nama,
        kelas: request.body.kelas,
        poin: request.body.poin,
        nis: request.body.nis,
    }

    if(request.file){
        // jika edit menyertakan gambar
        let siswa = await modelSiswa.findOne({ where: { id_siswa: id} })
        let oldFileName = siswa.image  

        // dellete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        // menyisipkan nama file baru ke dalam objek data siswa
        dataSiswa.image = request.file.filename
    }
    
    modelSiswa.update(dataSiswa, {where: {id_siswa: id}})
        .then(result => {
            return response.json({
                message: `Data siswa berhasil diedit`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

exports.deleteDataSiswa = async (request, response) => {
    let id = request.params.id_siswa

    // ambil dulu data filename yg akan dihapus
    let siswa = await modelSiswa.findOne({ where: {id_siswa: id}})
    
    if(siswa){
        let oldFileName = siswa.image

        // delete file
        let location = path.join(__dirname,"../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }

    modelSiswa.destroy({where: {id_siswa: id}})
        .then(result => {
            return response.json({
                message: `Data siswa berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

