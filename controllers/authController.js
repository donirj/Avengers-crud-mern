//1. IMPORTACIONES 
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("./../models/User")

const { validationResult } = require("express-validator")

//2. CONTROLLERS
exports.loginUser = async (req, res) => {

    //VALIDACION DE FORMULARIO
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            msgError: errors.array()
        })
    }

    //OBTENER DATOS DEL FORMULARIO

    const { email, password } = req.body

    try {
        //1.VERIFICAR QUE EL USUARIO EXISTA EN BD
        let foundUser = await User.findOne({ email })
        //VALIDACION - SI NO ENCUENTRA AL USUARIO
        if(!foundUser){
            return res.status(400).json({
                msgError: "el usuario o password son incorrectos"
            })
        }
        
        console.log("usuario encontrado:", foundUser)

        //2. VERIFICAR CONTRASEÑA
        const verifiedPassword = await bcryptjs.compare(password, foundUser.hashedPassword)

        //SI EL PASSWORD NO COINCIDE
        if(!verifiedPassword){
            return res.status(400).json({
                msgError: "el usuario o el password son incorrectos"
            })
        }

        //SI TODO COINCIDE, ENTONCES ENTREGA SU CREDENCIAL TOKEN
        //A. PAYLOAD
        const payload = {
            user: {
                id: foundUser._id
            }
        }

        //B. FIRMA
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {

                if(error){
                    return res.status(401).json({
                        msgError: "el usuario o el password son incorrectos"
                    })
                }

                //C. ENTREGA DEL TOKEN
                res.json({
                    data: {
                        token
                    }
                })

            }
        )

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msgError: "hubo un problema creando al usuario"
        })

    }


}

exports.verifyingToken = async (req, res) => {

    try {

        const userData = await User.findById(req.user.id).select("-hashedPassword")

        return res.json({
            data: {
                user: userData
            }
        })

    } catch (error) {

        console.log(error)
        
        return res.status(500).json({
            msgError: "hubo un error en la busqueda del usuario"
        })
    }
    
    res.send("verificando el token")

}