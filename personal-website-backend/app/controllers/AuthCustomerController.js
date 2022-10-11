import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()
const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env

import CustomerModel from '../models/CustomerModel.js'
import CustomerTokenModel from '../models/CustomerTokenModel.js'
import { createToken } from './CustomerTokenController.js'

export const loginUser = asyncHandler(async (req, res) => {
    let { username, password } = req.body
    const fetchUser = await CustomerModel.findOne({ username })
    if (!fetchUser) {
        res.status(400).json('Invalid credentialss')
    } else {
        const isVerified = await bcrypt.compare(password, fetchUser.password)
        if(isVerified) {
            const roles = Object.values(fetchUser.role)
            const user = { 
                "userInfo": { 
                    "name": username,
                    "roles": roles
                } 
            }
            const accessToken = generateToken(user)
            const refreshToken = jwt.sign(user, REFRESH_TOKEN)
            const id = fetchUser._id
            createToken(refreshToken)
            res.status(200).json({id: id, accessToken: accessToken, refreshToken: refreshToken })
        }else {
            res.status(401).json('Invalid credentialsu')
        }
    }
})

export const generateToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN, { expiresIn: '30s' })
}

export const logoutUser = asyncHandler(async (req, res) => {
    const fetchToken = await CustomerTokenModel.findOne({token: req.params.id}).deleteOne()

    if(!fetchToken) res.sendStatus(401)

    res.sendStatus(204)
})