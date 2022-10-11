import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { errorHandler } from './app/middlewares/Error.js'
import { router as customerRouter } from './app/routers/CustomerRouter.js'

dotenv.config()

const { CUSTOMER_PORT, CLIENT_ORIGIN, DB_URI } = process.env

const app = express()

app.use(express.json())
app.use(express.urlencoded({ 
    extended: true,
}))

app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
}))

app.use('/api/user', customerRouter)

app.use(errorHandler)

app.listen(CUSTOMER_PORT, () => console.log(`Server running on http://localhost:${CUSTOMER_PORT}...`))

mongoose.connect(DB_URI, () => console.log("Connected to the database..."))