import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { router as  musicRouter } from './app/routers/MusicRouter.js'
import { router as userRouter } from './app/routers/UserRouter.js'
import { errorHandler } from './app/middlewares/Error.js'

dotenv.config()

const { PORT, CLIENT_ORIGIN, DB_URI } = process.env

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
}))

app.use("/api/user", userRouter)
app.use("/api/data", musicRouter)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}...`))

mongoose.connect(DB_URI, () => console.log("Connected to the database..."))