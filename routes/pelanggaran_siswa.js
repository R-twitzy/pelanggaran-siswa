const express = require(`express`)
const app = express()

app.use(express.json())

let pelanggaranSiswaController = require(`../controllers/pelanggaranSiswaController`)

app.get("/", pelanggaranSiswaController.getData)
app.post("/", pelanggaranSiswaController.addData)
app.put("/:id_pelanggaran_siswa", pelanggaranSiswaController.updateData)
app.delete("/:id_pelanggaran_siswa", pelanggaranSiswaController.deleteData)

module.exports = app