const express = require(`express`)
const app = express()

app.use(express.json())

// call pelanggaranController
let pelanggaranController = require("../controllers/pelanggaranController")

let authorization = require("../middlewares/authorization")

// endpoint get data pelanggaran
app.get("/", authorization.authorization, pelanggaranController.getDatapelanggaran)

// endpoint add data pelanggaran
app.post("/", pelanggaranController.addDatapelanggaran)

// endpoint edit pelanggaran
app.put("/:id_pelanggaran", pelanggaranController.editDatapelanggaran)

// endpoint delete pelanggaran
app.delete("/:id_pelanggaran", pelanggaranController.deleteDatapelanggaran)

module.exports = app