import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { router as AuthUserRouter } from './app/routers/AuthUserRouter.js'
import { errorHandler } from './app/middlewares/Error.js'

dotenv.config()
const { AUTH_PORT, CLIENT_ORIGIN, DB_URI } = process.env

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
}))

app.use("/api/auth", AuthUserRouter)

app.use(errorHandler)

app.listen(AUTH_PORT, () => console.log(`Server running on http://localhost:${AUTH_PORT}...`))

mongoose.connect(DB_URI, () => console.log("Connected to the database..."))