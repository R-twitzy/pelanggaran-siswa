// memanggil file model untuk pelanggaran
let modelpelanggaran = require("../models/index").pelanggaran

exports.getDatapelanggaran = (request, response) => {
    modelpelanggaran.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.addDatapelanggaran = (request, response) => {
    // tampung data request
    let newpelanggaran = {
        nama_pelanggaran: request.body.nama_pelanggaran,
        poin: request.body.poin,
    }

    modelpelanggaran.create(newpelanggaran)
        .then(result => {
            return response.json({
                message: `Data pelanggaran berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

exports.editDatapelanggaran = (request, response) => {
    let id = request.params.id_pelanggaran
    let datapelanggaran = {
        nama_pelanggaran: request.body.nama_pelanggaran,
        poin: request.body.poin,
    }
    
    modelpelanggaran.update(datapelanggaran, {where: {id_pelanggaran: id}})
        .then(result => {
            return response.json({
                message: `Data pelanggaran berhasil diedit`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

exports.deleteDatapelanggaran = (request, response) => {
    let id = request.params.id_pelanggaran

    modelpelanggaran.destroy({where: {id_pelanggaran: id}})
        .then(result => {
            return response.json({
                message: `Data pelanggaran berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

