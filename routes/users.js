// routes/post.js
const express           = require("express")
const router            = express.Router()

const { check } = require("express-validator")

const usersController = require("./../controllers/usersController")

//CRUD DE USUARIOS
//GET - USERS 

//POST - USER - CREAR USUARIO
router.post("/create",
    [
        check("username", "el nombre es obligatorio.").not().isEmpty(),
        check("email", "agrega un email valido").isEmail(),
        check("password", "el password debe ser minimo de 6 caracteres").isLength({ min:6 })
    ]
,usersController.createUser)
//PUT - USER - ACTUALIZAR USUARIO

//DELETE - USER - BORRAR USUARIO

module.exports = router