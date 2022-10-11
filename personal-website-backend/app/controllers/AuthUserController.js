import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()
const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env

import UserModel from '../models/UserModel.js'
import TokenModel from '../models/TokenModel.js'
import { createToken } from './TokenController.js'

export const loginUser = asyncHandler(async (req, res) => {
    let { username, password } = req.body
    const fetchUser = await UserModel.findOne({ username })
    if (fetchUser == null) {
        res.status(400).json('Invalid credentials')
    } else {
        const isVerified = await bcrypt.compare(password, fetchUser.password)
        if(isVerified) {
            const user = { name: username }
            const accessToken = generateToken(user)
            const refreshToken = jwt.sign(user, REFRESH_TOKEN)
            createToken(refreshToken)
            res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })
        }else {
            res.status(401).json('Invalid credentials')
        }
    }
})

export const generateToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN, { expiresIn: '60s' })
}

export const logoutUser = asyncHandler(async (req, res) => {
    let { token } = req.headers

    const fetchToken = await TokenModel.find({token: new RegExp('^'+token+'$', "i")}).deleteOne()
    if(!fetchToken) {
        res.status(401).json('Error')
    }
    res.sendStatus(204)
})