import dotenv from "dotenv"
import jwt from 'jsonwebtoken'

dotenv.config()
const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env

export async function authenticateToken(req, res, next) {
    const token = await req.header('authorization')
    
    if(!token) return res.sendStatus(401)
    try {
        const convert = JSON.parse(token)

        let user = jwt.verify(convert, ACCESS_TOKEN)
        req.user = user.name
        next()
    } catch (error) {
        return res.sendStatus(403)
    }
}