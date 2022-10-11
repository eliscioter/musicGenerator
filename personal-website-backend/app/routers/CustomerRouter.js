import express from 'express'

import { createCustomer, addRole, fetchRole } from '../controllers/CustomerController.js'

import { loginUser, logoutUser } from '../controllers/AuthCustomerController.js'
import { verifyToken } from '../controllers/CustomerTokenController.js'

export const router = express.Router()

router.post('/login', loginUser)

router.post('/token', verifyToken)

router.delete('/logout/:id', logoutUser)

router.post('/store', createCustomer)

router.patch('/update/:id', addRole)

router.get('/role/:id', fetchRole)