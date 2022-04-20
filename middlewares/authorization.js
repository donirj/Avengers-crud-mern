//ESTE ARCHIVO SIRVE PARA DESENCRIUPTAR EL TOKEN Y QUE
//COINCIDA CON LA PALABRA SECRETA

//1.IMPORTACIONES
const jwt = require("jsonwebtoken")

const unlockingToken = (req, res, next) => {

    const token = req.header("x-auth-token")

    if(!token){
        return res.status(401).json({
            msgError: "no hay un token o es erroneo.Permiso no valido"
        })
    }

    try {
        const openToken = jwt.verify(token, process.env.SECRET)

        req.user = openToken.user

        next()

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msgError: "hubo un error en el proceso del token"
        })

    }

    next()

}

module.exports = unlockingToken