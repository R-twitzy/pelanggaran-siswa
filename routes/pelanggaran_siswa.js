const express = require(`express`)
const app = express()

app.use(express.json())

let pelanggaranSiswaController = require(`../controllers/pelanggaranSiswaController`)

let authorization = require("../middlewares/authorization")

app.get("/", authorization.authorization, pelanggaranSiswaController.getData)
app.post("/filter", authorization.authorization, pelanggaranSiswaController.filterPelanggaran)
app.get("/:id_siswa", authorization.authorization, pelanggaranSiswaController.findPelanggaranSiswa)
app.post("/", pelanggaranSiswaController.addData)
app.put("/:id_pelanggaran_siswa", pelanggaranSiswaController.updateData)
app.delete("/:id_pelanggaran_siswa", pelanggaranSiswaController.deleteData)

module.exports = app