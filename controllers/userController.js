// memanggil library md5
const md5 = require("md5")
let jwt = require(`jsonwebtoken`)

// memanggil file model untuk user
let modeluser = require("../models/index").user

exports.getDatauser = (request, response) => {
    modeluser.findAll()
    .then(result => {
        return response.json({
            Count : result.length,
            User: result
        })
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

exports.authentication = async(request, response) => {
        let data = {
            username: request.body.username,
            password: md5(request.body.password)
        }

        // validasi (cek data di tabel user)
        let result = await modeluser.findOne({where: data})

        if (result) {
            // data ditemukan

            // payload adalah data/informasi yg akan dienkripsi
            let payload = JSON.stringify(result) // konversi dari bentuk objek ke bentuk json
            let secretKey = `Sequelize itu sangat menyenangkan`

            // generate token
            let token = jwt.sign(payload, secretKey)
            return response.json({
                logged: true,
                token: token
            })

        } else{
            // data tidak ditemukan
            return response.json({
                logged: false,
                message: `invalid username or password`
            })
        }
}