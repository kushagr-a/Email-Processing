import express from "express"
import cors from "cors"

import { config } from "./config/config.js"
import { registerUploadRoutes } from "./routes/uload.js"


const app = express()

const PORT = config.PORT

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server up!"
    })
})

registerUploadRoutes(app)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})