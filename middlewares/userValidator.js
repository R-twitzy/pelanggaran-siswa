const { body } = require(`express-validator`)

exports.validate = [
    // validasi password
    body(`password`).isLength({min: 8})
    .withMessage(`Password terlalu pendek, min 8 karakter`)
    .notEmpty().withMessage(`password must be filled`),

    // validasi username
    body(`username`).notEmpty()
    .withMessage(`Username tidak boleh kosong`),

    // validasi nama
    body(`nama_user`).notEmpty()
    .withMessage(`Name of User must be filled`)
]
    