const Character = require("../models/Character")

//
exports.getAllCharacters = async (req, res) => {

    try {

        const characters = await Character.find({})

        console.log(characters)

        return res.json({
            data: characters
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            data: null,
            errorMsg: "hubo un error interno. estamos trabajando en ello"
        })

    }

    res.json({
        data: "hola mundo",

    })

}

exports.createCharacter = async (req, res) => {

    //obtener datos del formulario
    const {
        originalName,
        pictureUrl,
        aka,
        gender,
        description
    } = req.body

    try {

        const newCharacter = await Character.create({
            originalName,
            pictureUrl,
            aka,
            gender,
            description
        })

        res.json({
            data: newCharacter,
            msg: "personaje creado de manera exitosa"
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            errorMsg: "hubo un error al crear al personaje"
        })
    }

}

exports.updateCharacter = async (req, res) => {

    const {
        id,
        originalName,
        pictureUrl,
        aka,
        gender,
        description
    } = req.body

    try {

        const updatedCharacter = await Character.findByIdAndUpdate(id, {
            originalName,
            pictureUrl,
            aka,
            gender,
            description
        }, { new: true })

        return res.json({
            data: updatedCharacter
        })

    } catch (error) {

        console.log(error)
        
        return res.status(500).json({
            msgError: "hubo un error actualizando al personaje"
        })
    }

}

exports.deleteCharacter = async (req, res) => {

    const { id } = req.body

    try {

        const deletedCharacter = await Character.findByIdAndRemove({ _id: id })

        res.json({
            data: deletedCharacter,
            msg: "este personaje fue borrado exitosamente"
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            msgError: "hubo un error borrando al personaje"
        })
    }
}