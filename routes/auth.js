const express = require("express")
const router = express.Router()

const authController = require("./../controllers/authController")

const authorization = require("./../middlewares/authorization")

const { check } = require("express-validator")

//RUTAS DE AUTENTICACION
//SIRVEN PARA ENTREGAR CREDENCIALES Y VERIFICAR CREDENCIALES

//INICIAR SESION - ENTREGAR CREDENCIALES
//POST - AUTH - VERIFICAR QUE EL USUARIO ES EL MISMO QUE CREO ESTA CUENTA
//QUE EL CLIENTE DICE TENER
router.post("/login", [
    check("email", "ingresa un email valido").isEmail(),
    check("password", "no enviaste un password adecuado").not().isEmpty()
], authController.loginUser)

//VERIFICAR TOKEN - EL USUARIO ENVIA CREDENCIAL, HAY QUE
//REVISAR QUE NO ESTÁ CORRUPTA Y QUE ES CORRECTA
router.get("/verifyingToken", authorization, authController.verifyingToken)

module.exports = router