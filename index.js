//routes/auth
//1. importaciones
const express = require("express")
const app = express()

const cors = require("cors")

const connectDB = require("./config/db")

//2. middlewares
require("dotenv").config()
connectDB()
//activar cors - cross origin resource sharing
//permite a otros servidores acceder a este servidor y poder
//transferir datos entre ellos de una manera
//mas flexible. nos va permitir entregar datos a react sin restriccion
app.use(cors())

//todas las peticiones y retornos van a fluir en un formato json
app.use(express.json({ extended: true }))
//3. rutas
/*
CRUD
AUTH CON AUTORIZACION
*/
app.use("/api/characters", require("./routes/characters.js"))
app.use("/api/users", require("./routes/users.js"))
app.use("/api/auth", require("./routes/auth.js"))

//4. servidor
app.listen(process.env.PORT, () => {
    console.log("El Srv esta activo")
})