import express from 'express'

import { loginUser, logoutUser } from '../controllers/AuthUserController.js'
import { verifyToken } from '../controllers/TokenController.js'

export const router = express.Router()

router.post('/login', loginUser)

router.post('/token', verifyToken)

router.delete('/logout', logoutUser)
