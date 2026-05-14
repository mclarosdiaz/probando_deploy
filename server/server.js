import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()
import { MongoDBClient } from "./config/database.js"

const port = process.env.PORT || 3000
const host = 'localhost'

const start = async() =>{
    
    try {
        await MongoDBClient.connect()

        app.listen(port, host, () => {
            console.log(`👨🏻‍⚕️ Servidor corriendo en http://${host}:${port}`)
        })
    } catch (error) {
        console.error(error)

    }
}



