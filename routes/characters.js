// routes/post.js
const express           = require("express")
const router            = express.Router()

const charactersController = require("./../controllers/charactersController")

//CRUD
//GET - CHARACTERS - obteneer todos los personajes en adopcion
router.get("/get-all", charactersController.getAllCharacters)

//POST - CHARACTERS - CREAR UN PERSONAJE
router.post("/create", charactersController.createCharacter)

router.put("/update", charactersController.updateCharacter)

router.delete("/delete", charactersController.deleteCharacter)

module.exports = router