const express = require(`express`)
const app = express()

app.use(express.json())

// call pelanggaranController
let pelanggaranController = require("../controllers/pelanggaranController")

// endpoint get data pelanggaran
app.get("/", pelanggaranController.getDatapelanggaran)

// endpoint add data pelanggaran
app.post("/", pelanggaranController.addDatapelanggaran)

// endpoint edit pelanggaran
app.put("/:id_pelanggaran", pelanggaranController.editDatapelanggaran)

// endpoint delete pelanggaran
app.delete("/:id_pelanggaran", pelanggaranController.deleteDatapelanggaran)

module.exports = app