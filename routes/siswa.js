const express = require(`express`)
const app = express()

app.use(express.json())

// call siswaController
let siswaController = require("../controllers/siswaController")

// call testMiddleware
let testMiddleware = require("../middlewares/testMiddleware")
let authorization = require("../middlewares/authorization")
let uploadImage = require("../middlewares/uploadImage")

// endpoint get data siswa
app.get("/", [
    testMiddleware.middleware1, 
    testMiddleware.middleware2, 
    authorization.authorization
], 
    siswaController.getDataSiswa)

// endpoint add data siswa
app.post("/", [
    uploadImage.upload.single(`image`),
    authorization.authorization
], 
    siswaController.addDataSiswa)

// endpoint edit siswa
app.put("/:id_siswa", [
    uploadImage.upload.single(`image`),
    authorization.authorization
], 
    siswaController.editDataSiswa)

// endpoint delete siswa
app.delete("/:id_siswa", [
    authorization.authorization
], 
    siswaController.deleteDataSiswa)

module.exports = app