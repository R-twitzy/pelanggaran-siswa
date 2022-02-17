// memanggil library md5
const md5 = require("md5")

// memanggil file model untuk user
let modeluser = require("../models/index").user

exports.getDatauser = (request, response) => {
    modeluser.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.addDatauser = (request, response) => {
    // tampung data request
    let newuser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password: md5(request.body.password),
    }

    modeluser.create(newuser)
        .then(result => {
            return response.json({
                message: `Data user berhasil ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

exports.editDatauser = (request, response) => {
    let id = request.params.id_user
    let datauser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password: md5(request.body.password),
    }
    
    modeluser.update(datauser, {where: {id_user: id}})
        .then(result => {
            return response.json({
                message: `Data user berhasil diedit`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }

exports.deleteDatauser = (request, response) => {
    let id = request.params.id_user

    modeluser.destroy({where: {id_user: id}})
        .then(result => {
            return response.json({
                message: `Data user berhasil dihapus`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    }