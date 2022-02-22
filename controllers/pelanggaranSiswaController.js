let pelanggaranSiswaModel = require("../models/index").pelanggaran_siswa
let detailPelanggaranSiswaModel = require("../models/index").detail_pelanggaran_siswa

exports.getData = async (request, response) => {
    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }]
    })
    return response.json(data)
}

exports.addData = (request, response) => {
    let newData = {
            waktu: request.body.waktu,
            id_siswa: request.body.id_siswa,
            id_user: request.body.id_user
    }

    // insert ke tabel pelanggaran siswa
    pelanggaranSiswaModel.create(newData)
    .then(result => {
        let detail_pelanggaran_siswa = request.body.detail_pelanggaran_siswa
        // asumsinya detail_pelanggaran_siswa bertipe array
        let id = result.id_pelanggaran_siswa
        for (let i = 0; i < detail_pelanggaran_siswa.length; i++) {
            detail_pelanggaran_siswa[i].id_pelanggaran_siswa=id
        }

        // insert ke tabel detail_pelanggaran_siswa
        detailPelanggaranSiswaModel.bulkCreate(detail_pelanggaran_siswa)
        .then(result => {
            return response.json({
                message: `Data Pelanggaran siswa telah ditambahkan`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
    })    
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.updateData = (request, response) => {
    
}

exports.deleteData = (request, response) => {
    
}