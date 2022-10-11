import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()
const { REFRESH_TOKEN } = process.env

import TokenModel from '../models/TokenModel.js'
import { generateToken } from './AuthUserController.js'

export const createToken = (token) => {
    const createdToken = TokenModel.create({
        token
    })
    if(!createdToken) {
        throw new Error('No input')
    }
}

export const verifyToken = asyncHandler(async (req, res) => {
    const { token } = req.body

    if(!token) return res.sendStatus(401)

    const convert = JSON.parse(token)
    const fetchToken = await TokenModel.find({token: new RegExp('^'+convert+'$', "i")})
    
    if(!fetchToken) return res.sendStatus(403)
    
    jwt.verify(convert, REFRESH_TOKEN, (err, user) => {
        if (err) return user.sendStatus(403)
        const accessToken = generateToken({ name: user.name })
        res.status(201).json(accessToken)
    })

})