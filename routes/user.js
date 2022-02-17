const express = require(`express`)
const app = express()

app.use(express.json())

// call userController
let userController = require("../controllers/userController")

// endpoint get data user
app.get("/", userController.getDatauser)

// endpoint add data user
app.post("/", userController.addDatauser)

// endpoint edit user
app.put("/:id_user", userController.editDatauser)

// endpoint delete user
app.delete("/:id_user", userController.deleteDatauser)

module.exports = app