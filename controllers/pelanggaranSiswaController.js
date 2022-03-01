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

exports.updateData = async (request, response) => {
    let id = request.params

    // define data yang diubah di tabel pelanggaran siswa
    let newData = {
        waktu: request.body.waktu,
        id_siswa: request.body.id_siswa,
        id_user: request.body.id_user
    }

    // eksekusi update tbl pelanggaran siswa
    pelanggaranSiswaModel.update(
        newData, { where: {id_pelanggaran_siswa: id} }
    )
        .then(async (result) => {
            // ada 2 detail -> 1 detail
            // kita hapus data detail yg lama
            // insert data detail yg baru

            // step 1: hapus semua detail berdasarkan id_pelanggaran_siswa
            await detailPelanggaranSiswaModel.destroy(
                { where: {
                    id_pelanggaran_siswa: request.params.id_pelanggaran_siswa
                }}
            )
            // --------------------------

            // step 2: insert kembali data detail terbaru
            let detail_pelanggaran_siswa = request.body.detail_pelanggaran_siswa
            let id = result.id_pelanggaran_siswa
            for (let i = 0; i < detail_pelanggaran_siswa.length; i++) {
                detail_pelanggaran_siswa[i].id_pelanggaran_siswa=id
            }

            // insert ke tabel detail_pelanggaran_siswa
            detailPelanggaranSiswaModel.bulkCreate(detail_pelanggaran_siswa)
            .then(result => {
                return response.json({
                    message: `Data Pelanggaran siswa telah diedit`
                })
            })
            .catch(error => {
                return response.json({
                    message: error.message
                })
            })
            })
        .catch(error => console.log(error))
}

exports.deleteData = (request, response) => {
    let id = request.params.id_pelanggaran_siswa

    // hapus detail pelanggaran siswa
    detailPelanggaranSiswaModel.destroy({
        where: {
            id_pelanggaran_siswa: id
        }
    })
        .then(result => {
            let id = request.params.id_pelanggaran_siswa

            // hapus data pelanggaran_siswa
            pelanggaranSiswaModel.destroy({
                where: {
                    id_pelanggaran_siswa: id
                }
            })
                .then(result => {
                    return response.json({
                        message: `Data pelanggaran siswa berhasil dihapus`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })
        })
        .catch(error => console.log(error))
}