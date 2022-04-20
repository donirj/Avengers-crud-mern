const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const  { validationResult } = require("express-validator")

const User = require("./../models/User")

exports.createUser = async (req, res) => {

    //REVISION DE VALIDACIONES
    const errors = validationResult(req)
    console.log(errors)

    if(!errors.isEmpty()){
        return res.status(400).json({
            msgError: errors.array()
        })
    }

    //pedir datos del formulario
    const { username, email, password } = req.body

    //encriptacion

    try {
        
        const salt = await bcryptjs.genSalt(10)

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            hashedPassword
        })

        //SI EL USUARIO SE REGISTRÓ CORRECTO, NO SE LE VA PEDIR LOGIN

        //PROCESO DE JWT - AUTH - ENTREGA DE CREDENCIAL
        //A. CREAR LOS DATOS QUE VAN A ESTAR ESCRITOS EN LA CREDENCIAL
        const payload = {
            user: {
                id: newUser._id
            }
        }

        //B. FIRMAR POR EL SERVIDOR LA CREDENCIAL
        jwt.sign(
            payload,//TODOS LOS DATOS DE LA CREDENCIAL
            process.env.SECRET,
            {
                expiresIn: 360000 //segundos
            },
            (error, token) => {
                console.log(error)
                
                if(error) {
                   return res.status(401).json({
                        msgError: "hubo un problema en la creacion del token"
                    })
                }
                return res.json({
                    data: {
                        token
                    }
                })
            }
        )

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msgError: "hubo un problema creando al usuario"
        })

    }

}