const express = require(`express`)
const app = express()

app.use(express.json())

// call siswaController
let siswaController = require("../controllers/siswaController")

// endpoint get data siswa
app.get("/", siswaController.getDataSiswa)

// endpoint add data siswa
app.post("/", siswaController.addDataSiswa)

// endpoint edit siswa
app.put("/:id_siswa", siswaController.editDataSiswa)

// endpoint delete siswa
app.delete("/:id_siswa", siswaController.deleteDataSiswa)

module.exports = app