const detail_pelanggaran_siswa = require("../models/detail_pelanggaran_siswa")

let pelanggaranSiswaModel = require("../models/index").pelanggaran_siswa
let detailPelanggaranSiswaModel = require("../models/index").detail_pelanggaran_siswa
let siswaModel = require("../models/index").siswa
let pelanggaranModel = require("../models/index").pelanggaran

exports.getData = async (request, response) => {
    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }]
    })
    return response.json({
        Count : data.length,
        hasil: data
    })
}

exports.filterPelanggaran = async (request, response) => {
    // filter tgl awal dan tgl akhhir
    let start = request.body.start
    let end = request.body.end

    /** query= select * from pelanggaran_siswa where waktu between start and end */
    
    // import sequelize operator
    let sequelize = require(`sequelize`)
    let Op = sequelize.Op

    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }],
        where: {
            waktu: {[Op.between]: [start, end]}
        }
    })
    return response.json({
        Count : data.length,
        hasil: data
    })
}

exports.findPelanggaranSiswa = async (request, response) => {
    let id = request.params.id_siswa

    let data = await pelanggaranSiswaModel.findAll({
        include: ["siswa", "user", {
            model: detailPelanggaranSiswaModel,
            as: "detail_pelanggaran_siswa",
            include: ["pelanggaran"]
        }],
        where: {
            id_siswa: id
        }
    })
    return response.json({
        Count : data.length,
        hasil: data
    })
}

exports.addData = async (request, response) => {

    // proses pengurangan poin dari siswa yang melanggar
    // 1 m3ngambil poin daro siswa yg bersangkutan
    let siswa = await siswaModel.findOne ({
        where: {id_siswa: request.body.id_siswa}
    })
    let poinSiswa = siswa.poin
    
    // 2 mengambil nilai poin dari tiap pelanggaran
    let detail = request.body.detail_pelanggaran_siswa
    jumlahpoinPelanggaran = 0
    for (let i = 0; i < detail.length; i++) {
        // ambil poin dari tiap pelanggaran
        let pelanggaran = await pelanggaranModel.findOne({
            where : {id_pelanggaran: detail[i].id_pelanggaran}
          })
        let poinPelanggaran = pelanggaran.poin
        jumlahpoinPelanggaran += poinPelanggaran
    }

    // 3. poin siswa dikurangi jumlah poin pelanggaran
    let newPoin = poinSiswa - jumlahpoinPelanggaran

    // 4. update poin siswa
    await siswaModel.update({ poin: newPoin }, 
        {
            where: {id_siswa: request.body.id_siswa}
        })

    // proses untuk insert ke tabel pelanggaran siswa dan detailnya
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